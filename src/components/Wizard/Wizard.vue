<script>
import { onMounted, ref, watch } from "vue"

export default {
	props: {
		steps: {
			type: Array,
			default: () => [],
		},
		step: {
			type: Number,
			default: 1,
		},
		size: {
			type: String,
			default: "1.4rem",
		},
	},

	setup(props) {
		const filledLineSize = ref(0)
		const mappedSteps = props.steps.map((label, index) => ({ value: ++index, label }))

		const updateFirstUnfilledElementOffset = () => {
			const firstUnfilledStep = document.getElementById(`${props.step + 1}-step`)
			let offset = 0
			if (firstUnfilledStep) {
				offset = firstUnfilledStep.offsetTop + firstUnfilledStep.offsetHeight / 2
			} else {
				offset = document.getElementById("vue-wiard-wrapper")?.offsetHeight
			}
			filledLineSize.value = offset
		}

		watch(props, updateFirstUnfilledElementOffset)

		onMounted(() => {
			updateFirstUnfilledElementOffset()
			document.getElementById("vue-wizard-wrapper")?.style.setProperty("--step-size", props.size)
		})

		return { filledLineSize, mappedSteps, props }
	},
}
</script>

<template>
	<div class="vue-wizard-wrapper" id="vue-wizard-wrapper">
		<div class="primary line" :style="{ height: `${filledLineSize}px` }"></div>
		<div class="secondary line"></div>
		<div
			v-for="item of mappedSteps"
			class="step"
			:id="`${item.value}-step`"
			:class="{ filled: props.step >= item.value }"
			:key="item.value"
		>
			<div class="point" />
			<label class="label">{{ item.label }}</label>
		</div>
	</div>
</template>

<style scoped>
.vue-wizard-wrapper {
	--step-size: 1.4em;

	--wizard-disabled-color: var(--secondary, lightGray);
	--wizard-primary-color: var(--primary, CornflowerBlue);
	--wizard-step-background-color: white;
	--wizard-point-outer-size: calc(var(--step-size) * 1.6);
	--wizard-nested-point-size: calc(var(--step-size) * 0.3);
	--wizard-line-width: max(calc(var(--step-size) * 0.2), 0.2em);
	--wizard-line-offset: calc(var(--wizard-point-outer-size) / 2 - var(--wizard-line-width) / 2);
	--wizard-border-width: max(2px, calc(var(--step-size) * 0.2));
	--wizard-gap: max(1em, var(--step-size));

	gap: var(--wizard-gap);
	position: relative;
	display: flex;
	flex-direction: column;
}

.vue-wizard-wrapper .line {
	width: var(--wizard-line-width);
	position: absolute;
	left: var(--wizard-line-offset);
	top: 0;
	height: 100%;
	z-index: 0;
}

.vue-wizard-wrapper .primary.line {
	background-color: var(--wizard-primary-color);
	height: 0%;
	z-index: 1;
}

.vue-wizard-wrapper .secondary.line {
	background-color: var(--wizard-disabled-color);
}

.vue-wizard-wrapper .step {
	display: grid;
	grid-template-columns: min-content 1fr;
	gap: 1rem;
	z-index: 2;
	align-items: center;
	justify-items: baseline;
}

.vue-wizard-wrapper .step .label {
	font-size: 1rem;
	font-weight: 600;
	color: var(--wizard-disabled-color);
}

.vue-wizard-wrapper .step.filled .point:before {
	border: var(--wizard-border-width) solid var(--wizard-primary-color);
}

.vue-wizard-wrapper .step.filled .point:after {
	display: block;
}

.vue-wizard-wrapper .step.filled .label {
	color: var(--wizard-primary-color);
}

.vue-wizard-wrapper .step .point {
	width: var(--wizard-point-outer-size);
	height: var(--wizard-point-outer-size);
	border-radius: 50%;
	background-color: var(--wizard-step-background-color);
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
}

.vue-wizard-wrapper .step .point:after {
	content: "";
	display: none;
	width: var(--wizard-nested-point-size);
	height: var(--wizard-nested-point-size);
	border-radius: 50%;
	background-color: var(--wizard-primary-color);
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
}

.vue-wizard-wrapper .step .point:before {
	content: "";
	width: var(--step-size);
	height: var(--step-size);
	border-radius: 50%;
	background-color: var(--wizard-step-background-color);
	border: var(--wizard-border-width) solid var(--wizard-disabled-color);
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
