export interface Result<T> {
  code:string | number
  data:T
  msg:string
}