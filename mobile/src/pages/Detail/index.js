import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as MailComposer from "expo-mail-composer";
import { Feather } from "@expo/vector-icons";
import { View, Text, Image, TouchableOpacity, Linking } from "react-native";

import logoImg from "../../assets/logo.png";

import styles from "./styles";

export default function Detail() {
  const navigation = useNavigation();

  const route = useRoute();
  const incident = route.params.incident;

  const message = `Olá ${
    incident.name
  }, entro em contato por meio desta, pois gostaria de ajudar no caso ${
    incident.title
  }, com o valor de ${incidentValue(incident.value)}.`;

  function navigateBack() {
    navigation.goBack();
  }

  function sendMail() {
    MailComposer.composeAsync({
      subject: `Herói do caso: ${incident.title}`,
      recipients: [incident.email],
      body: message
    });
  }

  function sendWhatsapp() {
    const number = incident.whatsapp.replace(/\D/g, "");
    alert(number);
    Linking.openURL(`whatsapp://send?phone=${number}&text=${message}`);
  }

  function incidentValue(value) {
    return Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(value);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <TouchableOpacity>
          <Feather
            name="arrow-left"
            size={28}
            color="#e20041"
            onPress={navigateBack}
          />
        </TouchableOpacity>
      </View>

      <View>
        <View style={styles.incident}>
          <Text style={[styles.incidentProperty, { marginTop: 0 }]}>ONG:</Text>
          <Text style={styles.incidentValue}>
            {incident.name} de {incident.city} / {incident.uf}
          </Text>

          <Text style={styles.incidentProperty}>CASO:</Text>
          <Text style={styles.incidentValue}>{incident.title}</Text>

          <Text style={styles.incidentProperty}>VALOR:</Text>
          <Text style={styles.incidentValue}>
            {incidentValue(incident.value)}
          </Text>
        </View>
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Salve o dia!</Text>
        <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>
        <Text style={styles.heroDescription}>Entre em contato:</Text>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
            <Text style={styles.actionText}>WhatsApp</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.action} onPress={sendMail}>
            <Text style={styles.actionText}>E-mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
