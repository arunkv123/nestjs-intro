pipeline {  
    agent any  
    stages {
        stage('build') {
            steps {
                sh 'npm --version'
                sh 'sudo docker-compose ps'
                sh 'sudo docker-compose kill'
                sh 'sudo docker-compose rm'
                sh 'sudo docker-compose up --build --force-recreate dev'
            }
            
        }
    }
}