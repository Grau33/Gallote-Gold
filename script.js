let users = JSON.parse(localStorage.getItem("users")) || {};
let currentUser = null;

function showRegister() {
    document.getElementById("login").style.display = "none";
    document.getElementById("register").style.display = "block";
}

function showLogin() {
    document.getElementById("register").style.display = "none";
    document.getElementById("login").style.display = "block";
}

function register() {
    let username = document.getElementById("newUsername").value;
    let password = document.getElementById("newPassword").value;
    let balance = parseFloat(document.getElementById("initialBalance").value);

    if (username && password && balance >= 0) {
        users[username] = { password, balance, transactions: [] };
        localStorage.setItem("users", JSON.stringify(users));
        alert("Cadastro realizado! Agora faça login.");
        showLogin();
    } else {
        alert("Preencha todos os campos corretamente.");
    }
}

function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (users[username] && users[username].password === password) {
        currentUser = username;
        document.getElementById("saldo").innerText = "R$ " + users[username].balance.toFixed(2);
        document.getElementById("welcome").innerText = "Olá, " + username + "!";
        document.getElementById("login").style.display = "none";
        document.getElementById("dashboard").style.display = "block";
    } else {
        alert("Usuário ou senha incorretos.");
    }
}

function togglePix() {
    document.getElementById("pixTransfer").style.display = 
        document.getElementById("pixTransfer").style.display === "block" ? "none" : "block";
}

function transferirPix() {
    let valor = parseFloat(document.getElementById("pixAmount").value);
    if (valor > 0 && valor <= users[currentUser].balance) {
        users[currentUser].balance -= valor;
        users[currentUser].transactions.push({ type: "Pix", amount: -valor });
        localStorage.setItem("users", JSON.stringify(users));
        document.getElementById("saldo").innerText = "R$ " + users[currentUser].balance.toFixed(2);
        alert("Pix transferido com sucesso!");
        document.getElementById("pixAmount").value = "";
        togglePix();
    } else {
        alert("Saldo insuficiente ou valor inválido.");
    }
}

function toggleHistory() {
    let historyDiv = document.getElementById("history");
    if (historyDiv.style.display === "block") {
        historyDiv.style.display = "none";
    } else {
        let list = document.getElementById("transactionList");
        list.innerHTML = users[currentUser].transactions.length === 0 ? "<li>Nenhuma transação</li>" : 
            users[currentUser].transactions.map(t => `<li>${t.type}: R$ ${t.amount.toFixed(2)}</li>`).join("");
        historyDiv.style.display = "block";
    }
}

function logout() {
    document.getElementById("dashboard").style.display = "none";
    document.getElementById("login").style.display = "block";
    currentUser = null;
}
