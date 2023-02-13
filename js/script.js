
function limpa_formulario_cep() {
    $('#rua').val('');
    $('#bairro').val('');
    $('#cidade').val('');
    $('#uf').val('');
}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        $('#rua').val(conteudo.logradouro);
        $('#bairro').val(conteudo.bairro);
        $('#cidade').val(conteudo.localidade);
        $('#uf').val(conteudo.uf);
    } 
    else {
        limpa_formulario_cep();
        alert("CEP não encontrado.");
    }
}

function pesquisacep(valor) {
    var cep = valor.replace(/\D/g, '');

    if (cep != "") {
        var validacep = /^[0-9]{8}$/;

        if(validacep.test(cep)) {
            $('#rua').val('...');
            $('#bairro').val('...');
            $('#cidade').val('...');
            $('#uf').val('...');

            $.ajax({
                url: 'https://viacep.com.br/ws/' + cep + '/json/',
                dataType: 'jsonp',
                success: function(data) {
                    meu_callback(data);
                }
            });
        } 
        else {
            limpa_formulario_cep();
            alert("Formato de CEP inválido.");
        }
    } 
    else {
        limpa_formulario_cep();
    }
}


