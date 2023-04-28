import React from 'react'
import AppHeader from '~/components/AppHeader'
import styles from './About.module.scss'
import about from '~/store/about'
import emailIcon from '~/assets/icon_email.svg'
import githubIcon from '~/assets/icon_github.svg'
import blogIcon from '~/assets/icon_blog.svg'

export default function About() {
  const { photo, name, email, github, blog } = about.state
  return (
    <div className={styles.about}>
      <AppHeader />
      <div className={styles.container}>
        <div className={styles.me}>
          <div
            style={{ backgroundImage: `url(${photo})` }}
            className={styles.profile}></div>
          <p className={styles.name}>{name}</p>
        </div>
        <div className={styles.links}>
          <p>
            <a
              href="https://mail.google.com/mail?view=cm&fs=1&to=${email}"
              target="_blank">
              <img
                src={emailIcon}
                alt="Email"
              />
              {email}
            </a>
          </p>
          <p>
            <a
              href={github}
              target="_blank">
              <img
                src={githubIcon}
                alt="Github"
              />
              Github
            </a>
          </p>
          <p>
            <a
              href={blog}
              target="_blank">
              <img
                src={blogIcon}
                alt="Blog"
              />
              Blog
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
