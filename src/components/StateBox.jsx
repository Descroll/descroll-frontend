function StateBox({title, subtitle}){

    return(
        <div className="state-box">

            <p>{title}</p>
            {subtitle && <span> {subtitle} </span>}

        </div>
    );
}
export default StateBox;