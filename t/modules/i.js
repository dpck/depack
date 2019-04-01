const f = () => console.log(10)
;({ get b() { return f } }).b()