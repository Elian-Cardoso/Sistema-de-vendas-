// Recupera as vendas armazenadas ou cria um array vazio
let vendas = JSON.parse(localStorage.getItem("vendas")) || [];

function adicionarVenda() {
    let valor = parseFloat(document.getElementById("valor").value);
    let formaPagamento = document.getElementById("formaPagamento").value;

    // Verifica se o valor da venda é válido
    if (!isNaN(valor) && valor > 0) {
        // Adiciona a venda ao array, incluindo a forma de pagamento
        vendas.push({ valor, formaPagamento });
        salvarDados();
        atualizarLista();
    } else {
        alert("Por favor, insira um valor válido para a venda.");
    }

    // Limpa o campo de valor após adicionar
    document.getElementById("valor").value = "";
}

function atualizarLista() {
    let lista = document.getElementById("listaVendas");
    let totalGeral = 0;
    let totalCredito = 0, totalDebito = 0, totalPix = 0, totalDinheiro = 0;

    lista.innerHTML = ""; // Limpa a lista antes de atualizar

    // Atualiza a lista de vendas e os totais por forma de pagamento
    vendas.forEach(function(v) {
        let tipo = "";
        switch (v.formaPagamento) {
            case "credito":
                tipo = "💳 Crédito";
                totalCredito += v.valor;
                break;
            case "debito":
                tipo = "🏦 Débito";
                totalDebito += v.valor;
                break;
            case "pix":
                tipo = "📱 Pix";
                totalPix += v.valor;
                break;
            case "dinheiro":
                tipo = "💵 Dinheiro";
                totalDinheiro += v.valor;
                break;
        }
        totalGeral += v.valor;

        // Cria um item para a venda na lista
        let item = document.createElement("li");
        item.textContent = `${tipo}: R$ ${v.valor.toFixed(2)}`;
        lista.appendChild(item);
    });

    // Atualiza os totais na interface
    document.getElementById("total").textContent = totalGeral.toFixed(2);
    document.getElementById("totalCredito").textContent = totalCredito.toFixed(2);
    document.getElementById("totalDebito").textContent = totalDebito.toFixed(2);
    document.getElementById("totalPix").textContent = totalPix.toFixed(2);
    document.getElementById("totalDinheiro").textContent = totalDinheiro.toFixed(2);
}

function zerarVendas() {
    if (confirm("Tem certeza que deseja apagar todas as vendas do dia?")) {
        vendas = [];
        salvarDados();
        atualizarLista();
    }
}

function salvarDados() {
    localStorage.setItem("vendas", JSON.stringify(vendas));
}

// Atualiza a lista ao carregar a página
atualizarLista();
