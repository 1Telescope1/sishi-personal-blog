export class Result {
  private data:any
  private status:number
  private message:string
  private success:boolean
  private path:string
  constructor(data = null, status = 200, message = null, success= true) {
    this.data=data
    this.status=status,
    this.message=message,
    this.success=success
  }
}
