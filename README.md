# Recuperação de senha
**RF (Requisitos funcinais)**
- O usuário deve poder recuperar a sua senha usando o email cadastrado na aplicação;
- O usuário deve receber um e-mail com instruções de recuperação de senha;
- O usuário deve poder resetar a sua senha;

**RFN (Requisitos não funcinais)**
- Utilizar Mailtrap para testar o envio em ambiente de dev;
- Utilizar Amozon SES para enviar em ambiente de produção;
- O envio de e-mail deve acontecer em segundo plano (background Job);

**RN (Regra de negócio)**
- O link eniado por email para resetar senha, deve expirar em 2h;
- O usuário precisar confirmar a nova senha ao resetar sua senha;

# Atualização do perfil
**RF**
- O usuário deve poder atualizar o seu perfil (nome, email e senha)

**RN**
- O usuário não pode alterar seu email para um email já utilizado;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuário precisar confirmar a nova senha;

# Painel do Prestador
**RF**
- O usário deve poder listar seus agendamentos de um dia específico;
- O prestador deve receber uma notifiação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**RFN**
- Os agendamentos do prestador no dia devem ser armazendadas em cache;
- As notificações do prestador devem ser armazendas no MongoDB;
- As notificaçòes do prestador devem enviadas em tempo-real utilizando Socket.io;
-
**RN**
- A notificação deve ter um status de lida ou não-lida para que o prestado possa controlar;

# Agendamento de serviços

**RF**
- O usuário deve poder listar todos prestadores de serviço cadastrado;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
- O usuário deve poder listar horários disponível em um dia específico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**RFN**
- A listagem de prestadores deve ser armazendo em cache;

**RN**
- Cada agendamento deve durar 1h exatamente;
- Os agendamento devem estar disponível entre 8h às 18h (Primerio às 8h, e último ás 17h);
- O usuário não pode agendar em um horário que já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar em um horário consigo mesmo;
