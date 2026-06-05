# 🏥 Paulistinha Clínica Médica

Aplicativo mobile de gestão para clínica médica, desenvolvido com **React Native + Expo** e integrado ao **Firebase**. O sistema permite o gerenciamento completo de pacientes, agendamento, confirmação, realização, finalização e cancelamento de exames, além de controle de pagamentos e visualização de agenda.

---

## 📋 Funcionalidades

- **Autenticação** — Tela de login para acesso ao sistema
- **Gerenciamento de Pacientes** — Cadastro, edição e listagem de pacientes
- **Agendamento de Exames** — Marcação de novos exames
- **Confirmação de Exames** — Confirmação de exames agendados
- **Realização de Exames** — Registro da realização com tela de detalhes
- **Finalização de Exames** — Encerramento do atendimento com detalhes e pagamento
- **Cancelamento de Exames** — Cancelamento com tela de detalhes
- **Visualização de Agenda** — Consulta da agenda da clínica

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Versão |
|---|---|
| React Native | 0.81.5 |
| React | 19.1.0 |
| Expo | ~54.0.33 |
| TypeScript | ~5.9.2 |
| Firebase | ^12.14.0 |
| React Navigation (Native) | ^7.2.2 |
| React Navigation (Native Stack) | ^7.14.12 |
| Expo Vector Icons | ^15.0.3 |
| AsyncStorage | 2.2.0 |
| React Native Safe Area Context | ~5.6.0 |
| React Native Screens | ~4.16.0 |
| React Native Web | ^0.21.0 |

---

## 📁 Estrutura do Projeto

```
Paulistinha_ClinicaMedica/
├── assets/                         # Imagens e recursos estáticos
├── src/
│   └── screens/
│       ├── Login/                  # Tela de login
│       ├── Home/                   # Tela principal
│       └── HomeCardScreens/
│           ├── ManagerPatients/    # Gerenciar, criar e editar pacientes
│           ├── MarkExam/           # Agendamento de exames
│           ├── ConfirmExam/        # Confirmação de exames
│           ├── RealizeExam/        # Realização de exames
│           ├── FinishExam/         # Finalização e pagamento
│           ├── CancelExam/         # Cancelamento de exames
│           └── ViewSchedule/       # Visualização de agenda
├── App.tsx                         # Componente raiz com navegação
├── index.ts                        # Entry point
├── app.json                        # Configurações do Expo
├── package.json                    # Dependências do projeto
└── tsconfig.json                   # Configuração do TypeScript
```

---

## ✅ Pré-requisitos

Antes de rodar o projeto, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) — versão **18 ou superior** (recomendado LTS)
- [npm](https://www.npmjs.com/) — incluso com o Node.js
- [Git](https://git-scm.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

```bash
npm install -g expo-cli
```

Para rodar em dispositivo físico:
- Aplicativo **Expo Go** instalado no celular ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) / [iOS](https://apps.apple.com/app/expo-go/id982107779))

Para rodar em emulador:
- **Android Studio** com um AVD (Android Virtual Device) configurado, ou
- **Xcode** (apenas macOS) para simulador iOS

---

## 🚀 Como Rodar o Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/Leonardo-do-Playstation/Paulistinha_ClinicaMedica.git
cd Paulistinha_ClinicaMedica
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o Firebase

O projeto utiliza Firebase para autenticação e banco de dados. É necessário criar um projeto no [Firebase Console](https://console.firebase.google.com/) e adicionar o arquivo de configuração.

> Procure pelo arquivo de configuração do Firebase dentro de `src/` (geralmente `firebaseConfig.ts` ou similar) e preencha com as credenciais do seu projeto Firebase:

```ts
const firebaseConfig = {
  apiKey: "AIzaSyCZuA0nuhjhjc8PTiOC1kGirIk3rlMuASw",
  authDomain: "mariaauxiliadora-9619e.firebaseapp.com",
  projectId: "mariaauxiliadora-9619e",
  storageBucket: "mariaauxiliadora-9619e.firebasestorage.app",
  messagingSenderId: "128106462533",
  appId: "1:128106462533:web:fb4332a32b89dc4ea3922c",
};

```

### 4. Inicie o projeto

```bash
npm start
# ou
npx expo start
```

O Expo abrirá um QR Code no terminal e no navegador. Escaneie com o aplicativo **Expo Go** no celular, ou pressione:

- `a` — para abrir no emulador Android
- `i` — para abrir no simulador iOS (apenas macOS)
- `w` — para abrir no navegador (web)

---

## 📱 Scripts Disponíveis

| Comando | Descrição |
|---|---|
| `npm start` | Inicia o servidor de desenvolvimento Expo |
| `npm run android` | Abre no emulador/dispositivo Android |
| `npm run ios` | Abre no simulador iOS |
| `npm run web` | Abre no navegador |

---

## 🔧 Possíveis Erros e Soluções

**Erro: `command not found: expo`**
```bash
npm install -g expo-cli
```

**Erro de versão do Node.js**
Certifique-se de usar o Node.js 18+. Use o [nvm](https://github.com/nvm-sh/nvm) para gerenciar versões.

**Erro com Firebase**
Verifique se as credenciais no arquivo de configuração estão corretas e se os serviços (Authentication, Firestore, etc.) estão habilitados no console do Firebase.

---

## 👥 Contribuidores

- [Leonardo-do-Playstation](https://github.com/Leonardo-do-Playstation)
  [Nicolas-Augusto-Almeida](https://github.com/Nicolas-Augusto-Almeida)
  [Walinson111](https://github.com/walinson111)
---

## 📄 Licença

Este projeto é privado e de uso interno da Clínica Maria Auxiliadora.
