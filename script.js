const broker = 'mqtt.eclipse.org';  // Substitua pelo endereço do seu broker MQTT
const topic = 'esp8266/led';
const clientId = 'web-client-' + Math.random().toString(16).substr(2, 8);

const client = new Paho.MQTT.Client(broker, 443, clientId);

client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

const options = {
  useSSL: true,
  onSuccess: onConnect,
  onFailure: onConnectFailure
};

function onConnect() {
  console.log('Conectado ao broker MQTT');
}

function onConnectFailure(error) {
  console.log('Falha na conexão: ' + error.errorMessage);
}

function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log('Conexão perdida: ' + responseObject.errorMessage);
  }
}

function onMessageArrived(message) {
  console.log('Mensagem recebida no tópico ' + message.destinationName + ': ' + message.payloadString);
}

client.connect(options);

function ligarLED() {
  enviarMensagem('ligar');
}

function desligarLED() {
  enviarMensagem('desligar');
}

function enviarMensagem(acao) {
  const mensagem = new Paho.MQTT.Message(acao);
  mensagem.destinationName = topic;
  client.send(mensagem);
}
