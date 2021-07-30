pipeline {    
    stages {
        stage('build') {
            steps {
                sh 'npm --version'
                sudo docker-compose ps
                sudo docker-compose kill
                sudo docker-compose rm
                sudo docker-compose up --build --force-recreate dev
            }
            post{
                always{
                   // step([$class: 'DockerComposeBuilder', dockerComposeFile: 'src/docker-compose.yml', option: [$class: 'StartService', scale: 1, service: 'dev'], useCustomDockerComposeFile: true])
                }
            }
        }
    }
}