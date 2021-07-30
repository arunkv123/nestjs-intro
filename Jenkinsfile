pipeline {  
    agent any  
    stages {
        stage('build') {
            steps {
                sh 'npm --version'
                sh 'docker-compose ps'
                sh 'docker-compose kill'
                sh 'docker-compose rm'
                sh 'docker-compose up --build --force-recreate dev'
            }
            
        }
    }
}