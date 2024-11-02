export const simplePlaybookTemplate = `---
- name: Simple Playbook
  hosts: all
  become: yes
  
  tasks:
    - name: Install required packages
      package:
        name: "{{ item }}"
        state: present
      loop:
        - nginx
        - python3`;

export const advancedPlaybookTemplate = `---
- name: Advanced Playbook
  hosts: all
  become: yes
  
  vars:
    nginx_port: 80
    app_root: /var/www/myapp
    
  pre_tasks:
    - name: Update package cache
      apt:
        update_cache: yes
      when: ansible_os_family == "Debian"
        
  tasks:
    - name: Install required packages
      package:
        name: "{{ item }}"
        state: present
      loop:
        - nginx
        - python3
        - git
        - certbot
        
    - name: Create app directory
      file:
        path: "{{ app_root }}"
        state: directory
        mode: '0755'
        
    - name: Configure Nginx
      template:
        src: nginx.conf.j2
        dest: /etc/nginx/sites-available/default
      notify: Restart Nginx
        
  handlers:
    - name: Restart Nginx
      service:
        name: nginx
        state: restarted`;