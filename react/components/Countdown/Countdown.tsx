import React, { useState } from 'react'
import { TimeSplit } from '../../typings/global'
import { tick, getOneDaysFromNow } from '../../utils/time'
import { useCssHandles } from 'vtex.css-handles'
import { FormattedMessage } from 'react-intl'
import Styles from './styles.css'

interface CountdownProps {
  title: string
  name: string
  subTitle: string
  textButton: string
  linkButton: string
  image: string
  linkImg: string
  targetDate: string
  minutes: string
  textHours: string
  textMinutes: string
  textSeconds: string
}

const DEFAULT_TARGET_DATE = getOneDaysFromNow()
const CSS_HANDLES = ['container', 'countdown']

const Countdown: StorefrontFunctionComponent<CountdownProps> = ({
  title,
  name,
  subTitle,
  textButton,
  linkButton,
  image,
  linkImg,
  targetDate = DEFAULT_TARGET_DATE,
  textHours,
  textMinutes,
  textSeconds
}) => {

  const [timeRemaining, setTime] = useState<TimeSplit>({
    hours: '00',
    minutes: '00',
    seconds: '00'
  })

  const titleText = title || <FormattedMessage id="countdown.title" />
  const handles = useCssHandles(CSS_HANDLES)

  tick(targetDate, setTime)

  return (
    <div className={`${handles.container} ${handles.container}--${name} t-heading-2 fw3 w-100 c-muted-1`}>
      <div className={`${Styles.containerImage} ${Styles.containerImage}--${name} flex tc justify-center mb6`}>
        <a href={linkImg} className={`${Styles.imageLink} ${Styles.imageLink}--${name}`}>
          <img
            src={image}
            className={`${Styles.image} ${Styles.image}--${name}`}
          />
        </a>
      </div>
      <div className={`${Styles.containerText} ${Styles.containerText}--${name} tc justify-center mb6`}>
        <p className={`${Styles.title} ${Styles.title}--${name} tc mb2 mt0`}>{titleText}</p>
        <p className={`${Styles.subTitle} ${Styles.subTitle}--${name} tc mb6 mt0`}>{subTitle}</p>
      </div>
      <div className={`${handles.countdown} ${handles.countdown}--${name} flex tc justify-center`}>
        <div className={`${Styles.containerTicks} ${Styles.containerTicks}--${name} flex justify-center items-center`}>
          <p className={`${Styles.tick} ${Styles.tick}--${name}`}>{timeRemaining.hours}</p>
        </div>
        <div className={`${Styles.containerTicks} ${Styles.containerTicks}--${name} flex justify-center items-center`}>
          <p className={`${Styles.tick} ${Styles.tick}--${name}`}>{timeRemaining.minutes}</p>
        </div>
        <div className={`${Styles.containerTicks} ${Styles.containerTicks}--${name} flex justify-center items-center`}>
          <p className={`${Styles.tick} ${Styles.tick}--${name}`}>{timeRemaining.seconds}</p>
        </div>
      </div>
      <div className={`${Styles.containerSubtitles} ${Styles.containerSubtitles}--${name} flex tc justify-center mb7`}>
        <p className={`${Styles.tickSubtitle} ${Styles.tickSubtitle}--${name}`}>{textHours}</p>
        <p className={`${Styles.tickSubtitle} ${Styles.tickSubtitle}--${name}`}>{textMinutes}</p>
        <p className={`${Styles.tickSubtitle} ${Styles.tickSubtitle}--${name}`}>{textSeconds}</p>
      </div>
      <div className={`${Styles.containerButton} ${Styles.containerButton}--${name} m-auto flex justify-center items-center`}>
        <a href={linkButton} className={`${Styles.buttonLink} ${Styles.buttonLink}--${name}`}>
          <p className={`${Styles.buttonText} ${Styles.buttonText}--${name}`}>{textButton}</p>
        </a>
      </div>
    </div>
  )
}

Countdown.schema = {
  title: 'editor.countdown.title',
  description: 'editor.countdown.description',
  type: 'object',
  properties: {
    title: {
      title: 'T??tulo',
      type: 'string',
      default: null,
    },
    subTitle: {
      title: 'Subt??tulo',
      type: 'string',
      default: null,
    },
    textButton: {
      title: 'Texto bot??n',
      description: 'Texto del bot??n',
      type: 'string',
      default: null,
    },
    linkButton: {
      title: 'Link bot??n',
      description: 'Link del bot??n',
      type: 'string',
      default: null,
    },
    image: {
      title: 'Imagen',
      description: 'Cargar imagen',
      type: 'string',
      default: null,
      widget: {
        'ui:widget': 'image-uploader',
      },
    },
    linkImg: {
      title: 'Link imagen',
      description: 'Link de la imagen',
      type: 'string',
      default: null,
    },
    textHours: {
      title: 'Horas',
      description: 'Subtitulo horas',
      type: 'string',
      default: null,
    },
    textMinutes: {
      title: 'Minutos',
      description: 'Subtitulo minutos',
      type: 'string',
      default: null,
    },
    textSeconds: {
      title: 'Segundos',
      description: 'Subtitulo segundos',
      type: 'string',
      default: null
    },
  },
}

Countdown.defaultProps = {
  title: 'Aprovecha los super descuentos',
  name: 'countdown',
  subTitle: 'antes que se acabe el tiempo',
  textButton: 'Ver todo',
  linkButton: '/',
  linkImg: '/',
  image: 'https://sideas.vtexassets.com/arquivos/countDown.svg',
  textHours: 'Hora(s)',
  textMinutes: 'Min(s)',
  textSeconds: 'Seg(s)'
}

export default Countdown