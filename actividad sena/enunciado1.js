function obtenerPromedio(lecturas) {
    return lecturas.reduce((a, b) => a + b, 0) / lecturas.length;
}

function obtenerAlerta(promedio) {
    if (promedio >= 14) {
        return "Alta";
    } else if (promedio >= 12 && promedio < 14) {
        return "Normal";
    } else {
        return "Baja";
    }
}

function main() {
    let totalHombres = 0;
    let totalMujeres = 0;
    const promedios = [];

    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Ingrese el número de pacientesd: ', (n) => {
        const pacientes = parseInt(n);
        let count = 0;

        rl.on('line', (input) => {
            count++;
            const datos = input.split(' ').map(parseFloat);
            const sexo = parseInt(datos[0]);
            if (sexo === 1) {
                totalHombres++;
            } else {
                totalMujeres++;
            }

            const lecturas = datos.slice(1);
            const promedio = obtenerPromedio(lecturas);
            promedios.push([promedio, obtenerAlerta(promedio)]);

            if (count === pacientes) {
                rl.close();
            }
        });

        rl.on('close', () => {
            promedios.sort((a, b) => a[0] - b[0]);

            console.log(`${totalHombres} ${totalMujeres}`);
            console.log(`${promedios[promedios.length - 1][0].toFixed(2)} ${promedios[promedios.length - 1][1]}`);
            console.log(`${promedios[0][0].toFixed(2)} ${promedios[0][1]}`);
        });
    });
}

main();
