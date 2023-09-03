export  const  methodTag=(method:string)=> {
  switch (method) {
    case "GET":return "success"
    case "POST":return "warning"
    case "DELETE":return "danger"
    case "PATCH":return "info"
  }
}