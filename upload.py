import paramiko
import os
import zipfile

# SSH Credentials
host = "8.210.71.187"
user = "root"
password = "Jkkk!@12334qqq"

# Paths
local_build_folder = "Archive"  # Change this to your local build folder path
remote_folder = "/home/xosotot/homes/xosotot"
remote_zip_file = "Archive.zip"

# Create a zip file of the 'build' folder
def create_zip():
    print("Creating a zip file of the 'build' folder...")
    with zipfile.ZipFile(local_build_folder + ".zip", "w", zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(local_build_folder):
            for file in files:
                zipf.write(os.path.join(root, file), os.path.relpath(os.path.join(root, file), local_build_folder))
    print("Zip file created successfully.")

# Connect to the SSH server
def ssh_connect(host, user, password):
    print(f"Connecting to {host} as {user}...")
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(host, username=user, password=password)
    print("Connected successfully.")
    return ssh

# Upload a file to the remote server
def upload_file(ssh, local_path, remote_path):
    print(f"Uploading {local_path} to {host}:{remote_path}...")
    sftp = ssh.open_sftp()
    sftp.put(local_path, remote_path)
    sftp.close()
    print("File uploaded successfully.")

# Execute a command on the remote server
def run_command(ssh, command):
    print(f"Running command on remote server: {command}")
    stdin, stdout, stderr = ssh.exec_command(command)
    output = stdout.read()
    print(f"Command output:\n{output.decode('utf-8')}")
    return output

try:
    # Create the zip file
    #create_zip()

    # Connect to the SSH server
    ssh = ssh_connect(host, user, password)

    # Upload the zip file to the remote folder
    upload_file(ssh, local_build_folder + ".zip", os.path.join(remote_folder, remote_zip_file))

    # Unzip the file and overwrite if necessary
    unzip_command = f"cd {remote_folder} && unzip -o {remote_zip_file}"
    run_command(ssh, unzip_command)

    # Set 0777 permissions recursively on the specified folder
    chmod_command = f"chmod -R 0777 {remote_folder}"
    run_command(ssh, chmod_command)

    # Delete the build.zip file
    delete_command = f"rm {os.path.join(remote_folder, remote_zip_file)}"
    run_command(ssh, delete_command)

    # Close the SSH connection
    ssh.close()

    print("Tasks completed successfully.")
except Exception as e:
    print("An error occurred:", str(e))
