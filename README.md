## Executando o Projeto

#### Clone o projeto
```sh
$ git clone https://github.com/williammoreschi/gobarber-api.git
$ cd gobarber-api
```

Crie os arquivos ou renomeie os .example para **.env** e **ormconfig.json**

```sh
# Dentro da pasta infra/docker existe um arquivo docker-compose.yml que possui
# os bancos necessário para aplicação funcionar.
# Basta ter o docker instalado em sua máquina.
$ docker-compose up -d # Iniciará em background e não irá bloquear o shell

# Instalando as dependências
$ yarn

# Rodar as migrations
$ yarn typeorm migration:run

# iniciando a api
$ yarn dev:server
```

## Licença
Este projeto é desenvolvido sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para saber mais detalhes.
