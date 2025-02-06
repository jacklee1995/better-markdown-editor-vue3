<template>
  <div class="home-pricing-page">
    <header class="pricing-header">
      <h1>Pricing Plans</h1>
      <p>Choose the plan that fits your needs</p>
    </header>

    <main class="pricing-main">
      <div class="pricing-cards">
        <div class="pricing-card free">
          <div class="card-header">
            <h2>Free</h2>
            <div class="price">$0<span>/month</span></div>
          </div>
          <div class="card-body">
            <ul class="features-list">
              <li>10 documents</li>
              <li>1 user</li>
              <li>Basic formatting</li>
              <li>Email support</li>
            </ul>
            <button class="btn btn-primary">Sign Up for Free</button>
          </div>
        </div>

        <div class="pricing-card pro">
          <div class="card-header">
            <h2>Pro</h2>
            <div class="price">$12<span>/month</span></div>
          </div>
          <div class="card-body">
            <ul class="features-list">
              <li>Unlimited documents</li>
              <li>5 users</li>
              <li>Advanced formatting</li>
              <li>Plugins & themes</li>
              <li>Priority email support</li>
            </ul>
            <button class="btn btn-primary">Get Started</button>
          </div>
        </div>

        <div class="pricing-card enterprise">
          <div class="card-header">
            <h2>Enterprise</h2>
            <div class="price">Custom</div>
          </div>
          <div class="card-body">
            <ul class="features-list">
              <li>Unlimited documents</li>
              <li>Unlimited users</li>
              <li>Advanced formatting</li>
              <li>Plugins & themes</li>
              <li>Dedicated account manager</li>
              <li>SLA & on-premise option</li>
            </ul>
            <button class="btn btn-primary">Contact Sales</button>
          </div>
        </div>
      </div>

      <div class="pricing-faq">
        <h2>Frequently Asked Questions</h2>
        <dl>
          <dt>What forms of payment do you accept?</dt>
          <dd>
            We accept payments via credit card (Visa, MasterCard, American Express) or PayPal.
          </dd>

          <dt>Do you offer student or non-profit discounts?</dt>
          <dd>
            Yes, we offer a 50% discount for students and non-profit organizations. Please contact
            our support team for details.
          </dd>

          <dt>Can I change my plan later on?</dt>
          <dd>
            Absolutely! You can upgrade, downgrade, or cancel your plan at any time from your
            account settings.
          </dd>

          <dt>Do you have a free trial?</dt>
          <dd>
            Yes, we offer a 14-day free trial for our Pro plan. No credit card required. You can
            start your free trial by signing up for a free account.
          </dd>
        </dl>
      </div>
    </main>

    <footer class="pricing-footer">
      <div class="money-back">
        <i class="icon-money-back"></i>
        30-day money-back guarantee
      </div>
      <div class="cancel-anytime">
        <i class="icon-cancel"></i>
        Cancel subscription at any time
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// Pricing page component
</script>

<style scoped lang="scss">
.home-pricing-page {
  padding: 2rem;

  .pricing-header {
    text-align: center;
    margin-bottom: 2rem;

    h1 {
      font-size: 2.5rem;
    }

    p {
      font-size: 1.25rem;
      color: #666;
    }
  }

  .pricing-main {
    max-width: 1000px;
    margin: 0 auto;
  }

  .pricing-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    margin-bottom: 4rem;

    .pricing-card {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 2rem;
      text-align: center;

      &.pro {
        border-color: #0066ee;
        background: #f0f6ff;
        transform: scale(1.05);
      }

      .card-header {
        margin-bottom: 1.5rem;

        h2 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }

        .price {
          font-size: 2.5rem;
          font-weight: bold;

          span {
            font-size: 1rem;
            font-weight: normal;
          }
        }
      }

      .card-body {
        .features-list {
          text-align: left;
          margin: 0 0 2rem;
          padding: 0 0 0 1.5rem;

          li {
            margin-bottom: 0.5rem;
          }
        }

        .btn {
          width: 100%;
        }
      }
    }
  }

  .pricing-faq {
    max-width: 700px;
    margin: 0 auto 4rem;

    h2 {
      font-size: 2rem;
      margin-bottom: 2rem;
    }

    dt {
      font-size: 1.25rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
    }

    dd {
      margin-bottom: 1.5rem;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  .pricing-footer {
    display: flex;
    justify-content: center;
    gap: 3rem;
    font-size: 0.875rem;
    color: #666;

    i {
      margin-right: 0.5rem;
    }
  }
}
</style>
