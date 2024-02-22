#!/usr/bin/env bash

ansible-playbook --extra-vars @resources/hosts_password.yml --vault-password-file .vault_key kiosk-countdown.yml