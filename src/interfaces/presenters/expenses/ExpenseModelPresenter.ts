import { ExpensePerMonthOutputDto } from "../../../application/dtos/expensesDto";

export class ExpenseModelPresenter {
    public month(months: ExpensePerMonthOutputDto[]): ExpensePerMonthOutputDto[] {
        return months.map(expense => ({
            id: expense.id,
            nome: expense.nome,
            customerId: expense.customerId,
            frequencia: expense.frequencia,
            recorrente: expense.recorrente,
            replicar: expense.replicar,
            vencimento: expense.vencimento,
            meses: expense.meses,
        }));
    }
}