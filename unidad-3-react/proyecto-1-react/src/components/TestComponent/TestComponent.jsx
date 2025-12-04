function TestComponent () {

    function saludar () {
        alert('Hola Mundo')
    }

    let textButton = 'test'

    return (

        <button 
            onClick={saludar}
            >

            {textButton}
        </button>
    )

}

export default TestComponent