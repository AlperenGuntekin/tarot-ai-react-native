import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

export default function PremiumScreen() {
  const [selectedPlan, setSelectedPlan] = useState('1 year');

  const handlePurchase = () => {
    // Integrate with payment gateway here
    console.log('Proceed to purchase:', selectedPlan);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Upgrade to Premium</Text>
      {/* 
      <Image
        style={styles.image}
        source={require('../assets/premium-image.png')} // Placeholder image path
      /> */}

      <Text style={styles.subtitle}>Unlimited Access</Text>
      <Text style={styles.description}>
        Get access to all tracks, courses, and exercises along with all future
        content
      </Text>

      <View style={styles.planContainer}>
        <TouchableOpacity
          style={[
            styles.planOption,
            selectedPlan === '3 months' && styles.selectedPlan,
          ]}
          onPress={() => setSelectedPlan('3 months')}
        >
          <Text style={styles.planText}>3 months</Text>
          <Text style={styles.planPrice}>₹ 766.33/month</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.planOption,
            selectedPlan === '1 year' && styles.selectedPlan,
          ]}
          onPress={() => setSelectedPlan('1 year')}
        >
          <Text style={styles.planText}>1 year</Text>
          <Text style={styles.planPrice}>
            <Text style={styles.oldPrice}>₹ 766.33/month</Text> ₹ 316.58/month
          </Text>
          <Text style={styles.discountBadge}>-59%</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.purchaseButton} onPress={handlePurchase}>
        <Text style={styles.purchaseButtonText}>Continue</Text>
      </TouchableOpacity>

      <Text style={styles.terms}>
        Upon subscribing, your iTunes account will be charged. For details on
        auto-renewal and cancellation, see Terms and Conditions.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  image: {
    width: 300,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    marginBottom: 20,
  },
  planContainer: {
    width: '100%',
    marginBottom: 20,
  },
  planOption: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedPlan: {
    borderColor: '#007bff',
  },
  planText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  planPrice: {
    fontSize: 16,
    color: '#666',
  },
  oldPrice: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  discountBadge: {
    backgroundColor: '#28a745',
    color: '#fff',
    borderRadius: 5,
    paddingHorizontal: 5,
    marginTop: 5,
  },
  purchaseButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  purchaseButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  terms: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});
