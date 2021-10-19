const Contador = () =>{

    const [estado,setEstado] = React.useState(0)
    const aumentar = () => setEstado(estado+1)
    const disminuir = () => setEstado(estado-1)
    const color = () =>{
        if (estado>0) return "mayor"
        else if(estado<0) return "menor"
        else return ""
    }
    return (
    <div>    
        <div className="counter">
            <h1 className={color()}>Contador: {estado}</h1>
            <hr />
            <button onClick={aumentar}>Aumentar</button>
            <button onClick={disminuir}>Disminuir</button>
        </div>
    </div>
    )
}