import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Injectable()
export class ExpensesService {
  private expenses = [
    { id: 1, name: 'bread', createdAt: new Date().toISOString(), price: 2 },
  ];

  create(createExpenseDto: CreateExpenseDto) {
    const lastId = this.expenses[this.expenses.length - 1]?.id || 1;
    const newExpense = {
      id: lastId + 1,
      ...createExpenseDto,
      createdAt: new Date().toISOString()
    };
    this.expenses.push(newExpense);
    return newExpense;
  }

  findAll() {
    return this.expenses;
  }

  findOne(id: number) {
    const existingExpense = this.expenses.find((el) => el.id === id);
    return existingExpense;
  }

  update(id: number, updateExpenseDto: UpdateExpenseDto) {
    const index = this.expenses.findIndex((el) => el.id === id);
    if (index === -1)
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    const updatedExpense = {
      ...this.expenses[index],
      ...updateExpenseDto,
    };
    this.expenses[index] = updatedExpense
    return updatedExpense;
  }

  remove(id: number) {
    const index = this.expenses.findIndex((el) => el.id === id);
    if (index === -1)
      throw new HttpException('Expense not found', HttpStatus.NOT_FOUND);
    const existingExpense = this.expenses.splice(index, 1);

    return existingExpense;
  }
}
