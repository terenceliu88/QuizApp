<script setup>
    import Question from "../components/Question.vue"
    import QuizHeader from  "../components/QuizHeader.Vue"
    import {useRoute} from "vue-router"
    import { ref, computed } from "vue"
    import quizes from "../data/quizes.json"
    import Result from "../components/Result.vue"

    const route = useRoute()
    const quizId = parseInt(route.params.id)    // Get the quiz id from the path/url
    const quiz = quizes.find(q => q.id === quizId)
    const currentQuestionIndex = ref(0)
    const numberOfCorrectAnswers = ref(0)
    const showResults = ref(false)

    const questionStatus = computed(() => {
        return `${currentQuestionIndex.value}/${quiz.questions.length}`
    })

    const barPercentage = computed(() => {
        return `${currentQuestionIndex.value/quiz.questions.length * 100}%`
    })

    const onOptionSelected = (isCorrect) => {
        if (isCorrect) {
            numberOfCorrectAnswers.value++
        }

        if (quiz.questions.length - 1 === currentQuestionIndex.value) {
            showResults.value = "true"
        }

        currentQuestionIndex.value++
    }
</script>

<template>
    <div>
        <QuizHeader 
            :questionStatus="questionStatus" 
            :barPercentage="barPercentage"
        />
        <div>
            <Question 
                v-if="!showResults"
                :question="quiz.questions[currentQuestionIndex]"
                @selectOption="onOptionSelected"
            />
            <Result 
                v-else
                :quizQuestionLength="quiz.questions.length"
                :numberOfCorrectAnswers="numberOfCorrectAnswers"
            />
        </div>
    </div>
</template>