import { IExpenseMonth } from "../../_interfaces/IExpense";

export class Expense {
  constructor(
    private props: IExpenseMonth
  ){}
  
  public static with(props: IExpenseMonth) {
    return new Expense(props);
  }

  public get exoenseMes() {
    return this.props;
  }
}