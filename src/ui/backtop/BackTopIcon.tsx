import { defineComponent } from 'vue'

export interface BackTopIconProps {
  /**
   * 图标类名
   */
  icon?: string
}

export default defineComponent({
  name: 'BackTopIcon',
  props: {
    icon: {
      type: String,
      default: 'backtop-icon',
    },
  },
  setup(props) {
    return () => <i class={['backtop-icon', props.icon]}></i>
  },
})
