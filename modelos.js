function imprimirImagem(idImagem) {
    const imagem = document.getElementById(idImagem);
    
    if (imagem) {
        // Cria uma nova janela de impressão
        const janelaImpressao = window.open('', '_blank');

        console.log(imagem.src);
        
        // Escreve o HTML necessário na nova janela para conter apenas a imagem
        janelaImpressao.document.write('<html><head><title>Imprimir Imagem</title></head><body>');
        janelaImpressao.document.write('<img src="' + imagem.src + '" style="max-width: 100%; width: 100%; height: auto;">');
        janelaImpressao.document.write('</body></html>');
        
        // Fecha a escrita do documento
        janelaImpressao.document.close();
        
        // Espera o carregamento da imagem na nova janela para garantir a impressão correta
        janelaImpressao.onload = function() {
            janelaImpressao.print();
            janelaImpressao.close();
        };

    } else {
        alert("Imagem não encontrada!");
    }
}
