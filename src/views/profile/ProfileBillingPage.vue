<template>
  <div class="profile-billing-page">
    <h1>Billing & Subscription</h1>

    <section class="current-plan">
      <h2>Current Plan</h2>
      <p>
        You are currently on the <strong>{{ currentPlan }}</strong> plan.
      </p>
      <p>
        Your subscription will renew on <strong>{{ nextBillingDate }}</strong
        >.
      </p>
    </section>

    <section class="payment-methods">
      <h2>Payment Methods</h2>
      <ul>
        <li v-for="method in paymentMethods" :key="method.id">
          <span>{{ method.type }} ending in {{ method.lastFour }}</span>
          <button @click="removePaymentMethod(method.id)">Remove</button>
        </li>
        <li><button @click="addPaymentMethod">Add Payment Method</button></li>
      </ul>
    </section>

    <section class="invoices">
      <h2>Invoices</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Invoice #</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="invoice in invoices" :key="invoice.id">
            <td>{{ invoice.date }}</td>
            <td>{{ invoice.amount }}</td>
            <td>{{ invoice.number }}</td>
            <td><a :href="invoice.url" target="_blank">Download</a></td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="plan-selection">
      <h2>Change Plan</h2>
      <div v-for="plan in plans" :key="plan.id" class="plan">
        <h3>{{ plan.name }}</h3>
        <p>{{ plan.description }}</p>
        <ul>
          <li v-for="feature in plan.features" :key="feature">{{ feature }}</li>
        </ul>
        <p class="price">{{ plan.price }} / {{ plan.interval }}</p>
        <button @click="changePlan(plan.id)" :disabled="plan.id === currentPlan">
          {{ plan.id === currentPlan ? 'Current Plan' : 'Select Plan' }}
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const currentPlan = ref('Pro')
const nextBillingDate = ref('June 15, 2023')

const paymentMethods = ref([
  { id: 1, type: 'Visa', lastFour: '4242' },
  { id: 2, type: 'Mastercard', lastFour: '8888' },
])

function addPaymentMethod() {
  // TODO: Implement add payment method functionality
}

function removePaymentMethod(methodId: number) {
  // TODO: Implement remove payment method functionality
}

const invoices = ref([
  {
    id: 1,
    date: 'May 15, 2023',
    amount: '$49.99',
    number: 'INV-001',
    url: '/path/to/invoice1.pdf',
  },
  {
    id: 2,
    date: 'April 15, 2023',
    amount: '$49.99',
    number: 'INV-002',
    url: '/path/to/invoice2.pdf',
  },
  {
    id: 3,
    date: 'March 15, 2023',
    amount: '$49.99',
    number: 'INV-003',
    url: '/path/to/invoice3.pdf',
  },
])

const plans = ref([
  {
    id: 'free',
    name: 'Free',
    description: 'For individuals and small teams',
    features: ['10 users', '20 projects', '100 MB storage'],
    price: '$0',
    interval: 'month',
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'For growing teams and organizations',
    features: ['Unlimited users', 'Unlimited projects', '10 GB storage', 'Priority support'],
    price: '$49',
    interval: 'month',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For large businesses with advanced needs',
    features: [
      'Everything in Pro',
      'Dedicated account manager',
      'Custom integrations',
      'On-premise installation',
    ],
    price: 'Custom',
    interval: 'month',
  },
])

function changePlan(planId: string) {
  // TODO: Implement change plan functionality
}
</script>

<style scoped lang="scss">
.profile-billing-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;

  h1 {
    font-size: 2rem;
    margin-bottom: 20px;
  }

  section {
    margin-bottom: 40px;

    h2 {
      font-size: 1.5rem;
      margin-bottom: 10px;
    }
  }

  .current-plan {
    p {
      margin-bottom: 5px;
    }
  }

  .payment-methods {
    ul {
      list-style: none;
      padding: 0;

      li {
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        button {
          background: none;
          border: 1px solid #ccc;
          padding: 5px 10px;
          cursor: pointer;

          &:hover {
            background: #eee;
          }
        }
      }
    }
  }

  .invoices {
    table {
      width: 100%;
      border-collapse: collapse;

      th,
      td {
        padding: 10px;
        text-align: left;
        border-bottom: 1px solid #ccc;
      }

      th {
        background: #f5f5f5;
      }
    }
  }

  .plan-selection {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;

    .plan {
      border: 1px solid #ccc;
      padding: 20px;
      text-align: center;

      h3 {
        font-size: 1.25rem;
        margin-bottom: 10px;
      }

      ul {
        list-style: none;
        padding: 0;
        margin-bottom: 20px;

        li {
          margin-bottom: 5px;
        }
      }

      .price {
        font-size: 1.5rem;
        margin-bottom: 20px;
      }

      button {
        background: #007bff;
        color: white;
        border: none;
        padding: 10px 20px;
        cursor: pointer;

        &:hover {
          background: #0056b3;
        }

        &:disabled {
          background: #ccc;
          cursor: not-allowed;
        }
      }
    }
  }
}
</style>
