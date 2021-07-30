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
            post{
                always{
                   // step([$class: 'DockerComposeBuilder', dockerComposeFile: 'src/docker-compose.yml', option: [$class: 'StartService', scale: 1, service: 'dev'], useCustomDockerComposeFile: true])
                }
            }
        }
    }
}