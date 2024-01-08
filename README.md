# Overview

This documentation provides instructions on how to deploy a CloudFormation stack for a containerized web application on AWS ECS Fargate. The template sets up a VPC, subnets, an ECS cluster, an Application Load Balancer (ALB), and necessary roles and security groups.

## Application Description

The web application is a basic clicker app, consisting of the following files:

- `Dockerfile`: Defines the Docker container configuration.
- `index.html`: The front-end HTML file for the web application.
- `app.js`: The Node.js script that handles the click event and logs it to AWS CloudWatch.

These files are provided for reference. The actual Docker image used by the CloudFormation stack is pre-built and hosted on Docker Hub.

## Stack Features

- **Virtual Private Cloud (VPC)**: Creates an isolated network environment.
- **Subnets**: Configures public and private subnets within the VPC.
- **Internet Gateway**: Connects the VPC to the internet.
- **ECS Cluster**: Hosts the ECS Fargate services and tasks.
- **ECS Fargate Service and Task**: Manages and runs the containerized application.
- **Application Load Balancer (ALB)**: Distributes incoming web traffic across multiple targets, such as ECS tasks, in multiple Availability Zones.
- **Auto Scaling**: Automatically adjusts the number of ECS tasks based on the load.
- **Security Groups**: Controls inbound and outbound traffic to the ECS service and ALB.
- **Network ACLs**: Additional layer of security that acts as a firewall for controlling traffic in and out of the subnets.
- **IAM Roles**: Provides necessary permissions for ECS tasks and Auto Scaling.
- **CloudWatch Log Group**: Collects logs from the ECS tasks.
- **SNS Topic**: For sending notifications, such as CloudWatch Alarm alerts.



# Prerequisites

- **AWS Account**: You must have an AWS account with appropriate permissions to create AWS resources like VPC, ECS, IAM roles, etc.
- **Docker Image**: The Docker image for the web application should be available in a registry (e.g., Amazon ECR or Docker Hub).

# Customization

Before deployment, you can customize the following parameters in the CloudFormation template:

- **VpcCidr**: CIDR block for the VPC.
- **PublicSubnet1Cidr, PublicSubnet2Cidr**: CIDR blocks for public subnets.
- **PrivateSubnet1Cidr, PrivateSubnet2Cidr**: CIDR blocks for private subnets.
- **TaskCpu, TaskMemory**: CPU and memory allocation for ECS tasks.
- **MaxAutoScalingCapacity, MinAutoScalingCapacity**: Auto-scaling parameters for ECS service.
- **DockerImage**: Docker image URL for the ECS task.

# Deployment Steps

## Deploying via AWS CLI

1. **Prepare the CloudFormation Template**:
   - Download or clone the CloudFormation template to your local machine.
   - Make any necessary customizations as per your requirements.

2. **Deploy the CloudFormation Stack**:
   - Open a terminal or command prompt.
   - Navigate to the directory containing the CloudFormation template.
   - Use the AWS CLI to deploy the stack. Replace `my-stack-name` with your desired stack name:
     ```
     aws cloudformation create-stack --stack-name my-stack-name --template-body file://path_to_template/template.yaml --parameters ParameterKey=VpcCidr,ParameterValue=10.0.0.0/16 ParameterKey=PublicSubnet1Cidr,ParameterValue=10.0.1.0/24 # ... other parameters ...
     ```
   - Wait for the stack to be created. This may take several minutes.

## Deploying via AWS Management Console

1. **Log in to AWS Management Console**:
   - Open the AWS Management Console in your web browser and log in to your account.

2. **Open the CloudFormation Service**:
   - Navigate to the CloudFormation service.

3. **Create a New Stack**:
   - Click on "Create Stack" and select "With new resources (standard)".
   - Choose "Upload a template file", then click "Choose file" and upload your CloudFormation template.
   - Click "Next".

4. **Specify Stack Details**:
   - Enter a Stack name.
   - Fill in the parameters as required (e.g., VPC CIDR, Subnet CIDRs, Docker image).
   - Click "Next".

5. **Configure Stack Options** (Optional):
   - Configure additional options as needed (tags, permissions, etc.).
   - Click "Next".

6. **Review and Create Stack**:
   - Review the stack configuration.
   - Acknowledge that AWS CloudFormation might create IAM resources.
   - Click "Create stack".

7. **Monitor Stack Creation**:
   - Wait for the stack to be created. You can monitor the progress in the "Events" tab.

## Post-Deployment

To access the web application, use the URL of the Application Load Balancer provided in the stack's outputs. Monitor the application and AWS resources via the AWS Management Console.

## Updating and Deleting the Stack

- To update the stack, you can either modify the template and repeat the deployment process or use the AWS Management Console to update specific parameters.
- To delete the stack, go to the CloudFormation service in the AWS Management Console, select the stack, and choose "Delete".
