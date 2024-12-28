import { Request, Response } from "express";
import { CreateExpenseUseCase } from "../../../application/use-cases/expenses/CreateExpenseUseCase";

export class ExpenseController {
  constructor(
    private readonly createExpenseUseCase: CreateExpenseUseCase,
    //private readonly createExpenseMonthUseCase: CreateExpenseMonthUseCase
  ) {}

  public async createExpense(req: Request, res: Response): Promise<Response> {
    try {
      const { meses, ...expenseData } = req.body;

      // Salva a despesa
      const createdExpense = await this.createExpenseUseCase.execute(expenseData);

      // Se houver meses, salva-os
      if (meses && meses.length > 0) {
        const monthsData = meses.map((mes: any) => ({
          ...mes,
          expenseId: createdExpense.id, // Relaciona com a despesa
        }));

        //await this.createExpenseMonthUseCase.execute(monthsData);
      }

      return res.status(201).json({
        message: "Expense and months created successfully",
        expense: createdExpense,
      });
    } catch (error) {
      return res.status(500).json({ error: 'error.message' });
    }
  }
}
