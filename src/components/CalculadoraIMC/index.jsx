import { useState, useEffect } from "react";

import './style.css';

const Calculadora = () => {
    const [peso, setPeso] = useState(0);
    const [altura, setAltura] = useState(0);
    const [resultado, setResultado] = useState('');
    const [botaoHabilitado, setBotaoHabilitado] = useState(false);

    const calculaIMC = () => {
        const imc = peso / (altura * altura);
        return imc.toFixed(2);
    };

    const calcular = (evento) => {
        evento.preventDefault()
        const imc = calculaIMC();

        if (imc < 18.5) {
            setResultado('Magreza | Obesidade grau 0');
        } else if (imc >= 18.5 && imc < 25) {
            setResultado('Normal | Obesidade grau 0');
        } else if (imc >= 25 && imc < 30) {
            setResultado('Sobrepeso | Obesidade grau I');
        } else if (imc >= 30 && imc < 40) {
            setResultado('Obesidade | Obesidade grau II');
        } else if (imc >= 40) {
            setResultado('Obesidade grave | Obesidade grau III');
        } else {
            setResultado('Preencha todos os campos antes de calcular.')
        }
    };

    const getResultadoClass = () => {
        if (resultado.includes('Magreza')) {
            return 'magreza';
        } else if (resultado.includes('Normal')) {
            return 'normal';
        } else if (resultado.includes('Sobrepeso')) {
            return 'sobrepeso';
        } else if (resultado.includes('Obesidade grave')) {
            return 'obesidade-grave';
        } else if (resultado.includes('Obesidade')) {
            return 'obesidade';
        } else {
            return '';
        }
    };

    const handleInputChange = () => {
        setResultado('');
    };

    useEffect(() => {
        if (peso !== 0 && altura !== 0) {
            setBotaoHabilitado(true);
        } else {
            setBotaoHabilitado(false);
        }
    }, [peso, altura]);

    return (
        <div className="container">
            <h1>Vamos calcular o seu índice de massa corporal?</h1>
            <h4>Digite as suas informações no formulário abaixo</h4>
            <br />

            <div className="calculadora">
                <div className="input-box">
                    <label htmlFor="peso">Digite o seu peso (kg):</label>
                    <div className="input-field">
                        <input className="campo" placeholder="00.00" onChange={evento => {setPeso(parseFloat(evento.target.value)); handleInputChange(); }} id="weight" required />
                    </div>
                </div>
                <div className="input-box">
                    <label htmlFor="altura">Digite a sua altura (m):</label>
                    <div className="input-field">
                        <input className="campo" placeholder="00.00" onChange={evento => {setAltura(parseFloat(evento.target.value)); handleInputChange(); }} id="height" required />
                    </div>
                </div>
            </div>

            <button disabled={!botaoHabilitado} className="botao" type="submit" onClick={calcular}>CALCULAR</button>

            {resultado && (
                <>
                    <h2>Resultado</h2>
                    <div className="resultado">
                        <p className="imc">IMC: {calculaIMC()}</p>
                        <p className={`resultado-texto ${getResultadoClass()}`}>{resultado}</p>
                    </div>
                </>
            )}
        </div>
    )
};

export default Calculadora;