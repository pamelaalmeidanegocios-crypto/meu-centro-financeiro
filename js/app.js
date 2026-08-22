const STORAGE_KEY = "meuCentroFinanceiroLancamentos";

let lancamentos = JSON.parse(
  localStorage.getItem(STORAGE_KEY) || "[]"
);

// ===============================
// FUNÇÕES DE FORMATAÇÃO
// ===============================

function formatarMoeda(valor) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(valor);
}

function salvarLancamentos() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(lancamentos)
  );
}

// ===============================
// CÁLCULOS
// ===============================

function calcularResumo() {
  const receitas = lancamentos
    .filter(item => item.tipo === "receita")
    .reduce((total, item) => total + item.valor, 0);

  const despesas = lancamentos
    .filter(item => item.tipo === "despesa")
    .reduce((total, item) => total + item.valor, 0);

  const saldo = receitas - despesas;

  return {
    receitas,
    despesas,
    saldo
  };
}

// ===============================
// MOSTRAR RESUMO
// ===============================

function atualizarResumo() {
  const resumo = calcularResumo();

  const saldo = document.getElementById("saldo");
  const receitas = document.getElementById("receitas");
  const despesas = document.getElementById("despesas");

  if (saldo) {
    saldo.textContent = formatarMoeda(resumo.saldo);
  }

  if (receitas) {
    receitas.textContent = formatarMoeda(resumo.receitas);
  }

  if (despesas) {
    despesas.textContent = formatarMoeda(resumo.despesas);
  }
}

// ===============================
// ADICIONAR LANÇAMENTO
// ===============================

function adicionarLancamento(tipo, descricao, valor, categoria) {

  const novoLancamento = {
    id: Date.now(),
    tipo: tipo,
    descricao: descricao,
    valor: Number(valor),
    categoria: categoria,
    data: new Date().toISOString()
  };

  lancamentos.push(novoLancamento);

  salvarLancamentos();

  atualizarResumo();

  console.log("Lançamento adicionado:", novoLancamento);
}

// ===============================
// EXCLUIR LANÇAMENTO
// ===============================

function excluirLancamento(id) {

  lancamentos = lancamentos.filter(
    item => item.id !== id
  );

  salvarLancamentos();

  atualizarResumo();
}

// ===============================
// INICIALIZAÇÃO
// ===============================

document.addEventListener("DOMContentLoaded", () => {

  atualizarResumo();

  console.log(
    "Meu Centro Financeiro carregado!",
    lancamentos
  );

});
