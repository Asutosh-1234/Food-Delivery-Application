import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const faqs = [
  {
    question: "Where is my order?",
    answer: "You can track your order in real-time by navigating to the 'My Orders' section in the drawer or bottom tab.",
  },
  {
    question: "How do I cancel my order?",
    answer: "Orders can only be cancelled within 1 minute of placing them. Go to your active order and tap 'Cancel'.",
  },
  {
    question: "What are the delivery hours?",
    answer: "We deliver 24/7 in selected areas. Check your location for specific restaurant timings.",
  },
  {
    question: "I have a payment issue.",
    answer: "If your payment failed but money was deducted, it will be refunded within 3-5 business days automatically.",
  },
];

const HelpIndex = () => {
  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header Area */}
        <View style={styles.header}>
          <Text style={styles.title}>How can we help you?</Text>
          <Text style={styles.subtitle}>Find answers or get in touch with us.</Text>
        </View>

        {/* Contact Options Row */}
        <View style={styles.contactRow}>
          <TouchableOpacity style={styles.contactCard}>
            <View style={[styles.iconBox, { backgroundColor: "rgba(34, 197, 94, 0.15)" }]}>
              <Ionicons name="chatbubbles" size={24} color="#4ADE80" />
            </View>
            <Text style={styles.contactTitle}>Live Chat</Text>
            <Text style={styles.contactSubtitle}>Response in 2 mins</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactCard}>
            <View style={[styles.iconBox, { backgroundColor: "rgba(56, 189, 248, 0.15)" }]}>
              <Ionicons name="call" size={24} color="#38BDF8" />
            </View>
            <Text style={styles.contactTitle}>Call Us</Text>
            <Text style={styles.contactSubtitle}>Available 24/7</Text>
          </TouchableOpacity>
        </View>

        {/* FAQs */}
        <View style={styles.faqSection}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          {faqs.map((faq, index) => (
            <View key={index} style={styles.faqItem}>
              <View style={styles.faqQuestionRow}>
                <Text style={styles.faqQuestion}>{faq.question}</Text>
                <Ionicons name="chevron-down" size={20} color="#94A3B8" />
              </View>
              <Text style={styles.faqAnswer}>{faq.answer}</Text>
            </View>
          ))}
        </View>

        {/* Additional Links */}
        <View style={styles.linksSection}>
          <TouchableOpacity style={styles.linkItem}>
            <Ionicons name="document-text-outline" size={20} color="#94A3B8" />
            <Text style={styles.linkText}>Terms & Conditions</Text>
            <Ionicons name="chevron-forward" size={16} color="#475569" style={styles.linkArrow} />
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.linkItem}>
            <Ionicons name="shield-checkmark-outline" size={20} color="#94A3B8" />
            <Text style={styles.linkText}>Privacy Policy</Text>
            <Ionicons name="chevron-forward" size={16} color="#475569" style={styles.linkArrow} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HelpIndex;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B0F19",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#F8FAFC",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: "#94A3B8",
    fontWeight: "500",
  },
  contactRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
    gap: 12,
  },
  contactCard: {
    flex: 1,
    backgroundColor: "#1E293B",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
  },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  contactTitle: {
    color: "#F1F5F9",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  contactSubtitle: {
    color: "#64748B",
    fontSize: 12,
    fontWeight: "500",
  },
  faqSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#F8FAFC",
    marginBottom: 16,
  },
  faqItem: {
    backgroundColor: "#1E293B",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.03)",
  },
  faqQuestionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  faqQuestion: {
    color: "#E2E8F0",
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
    paddingRight: 16,
  },
  faqAnswer: {
    color: "#94A3B8",
    fontSize: 14,
    lineHeight: 22,
  },
  linksSection: {
    backgroundColor: "#1E293B",
    borderRadius: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.03)",
  },
  linkItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
  },
  linkText: {
    color: "#E2E8F0",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 12,
    flex: 1,
  },
  linkArrow: {
    marginLeft: "auto",
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
});
