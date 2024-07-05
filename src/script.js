const btn = document.getElementById("button");
const modelo = document.getElementById("caixa");
const container = document.getElementById("container");

btn.addEventListener("click", function() {
    const user = document.getElementById("name").value;

    const url = `https://api.github.com/users/${user}`;
    fetch(url)
        .then((resposta) => resposta.json())
        .then((dados) => {
            var d1 = dados.avatar_url;
            var d2 = dados.login;
            fetch(dados.repos_url)
                .then((resposta) => resposta.json())
                .then((repos) => {
                    const bloco = gera_bloco(d1, d2);
                    for (let i = 0; i < repos.length; i++) {
                        var namer = repos[i].name;
                        var descp = repos[i].description;
                        var lgnr = repos[i].language;
                        gera_rep(bloco, namer, descp, lgnr);
                    }
                })
                .catch((erro) => console.log("Erro ao buscar repositórios:", erro));
        })
        .catch((erro) => console.log("Erro ao buscar usuário:", erro));
});

function gera_bloco(img, nome) {
    const bloco = modelo.cloneNode(true);
    bloco.removeAttribute('id');
    bloco.style.display = "block";

    const vf = bloco.querySelector("#foto");
    const v1 = bloco.querySelector("#names");
    const v2 = bloco.querySelector("#login");

    vf.src = img;
    v1.innerText = nome;
    v2.innerText = "@" + nome;

    container.appendChild(bloco);
    return bloco;
}

function gera_rep(bloco, n, d, l) {
    const repContainer = document.createElement('div');
    repContainer.classList.add('bg-gray-200', 'w-11/12', 'mx-auto', 'text-left', 'px-2', 'mt-2');

    const nomeRepo = document.createElement('p');
    nomeRepo.classList.add('font-bold');
    nomeRepo.innerText = n;

    const descRepo = document.createElement('p');
    descRepo.innerText = d;

    const langRepo = document.createElement('p');
    langRepo.innerText = l;

    repContainer.appendChild(nomeRepo);
    repContainer.appendChild(descRepo);
    repContainer.appendChild(langRepo);

    bloco.appendChild(repContainer);
}