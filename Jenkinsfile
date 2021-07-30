pipeline {
    agent { docker { image 'node:14.17-alpine3.12' } }
    stages {
        stage('build') {
            steps {
                sh 'npm --version'
            }
        }
    }
}