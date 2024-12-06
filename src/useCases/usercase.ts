export interface UseCase<InputDto, OutputDto> {
  execute(input: InputDto, customerId?: string, despesaId?: string): Promise<OutputDto>
}