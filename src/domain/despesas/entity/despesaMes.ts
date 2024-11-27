import { IDespesaMes } from "../../_interfaces/IDespesas";

export class Despesa {
  constructor(
    private props: IDespesaMes
  ){}
  
  public static with(props: IDespesaMes) {
    return new Despesa(props);
  }

  public get despesaMes() {
    return this.props;
  }
}