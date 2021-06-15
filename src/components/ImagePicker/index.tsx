import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { FiCamera } from 'react-icons/fi'
import { ImagePickerContainer } from './styles'

interface ImagePickerProps {
  value: string
  onChange: (base64: string) => void
}

const ImagePicker = ({ value, onChange }: ImagePickerProps) => {
  const [image, setImage] = useState(value)

  useEffect(() => {
    setImage(value)
  }, [value])

  const getBase64FromFile = _image => {
    console.log(_image)
    if (!_image) return
    const file = _image[0]
    if (file.type !== 'image/png' && file.type !== 'image/jpeg')
      return toast.error('Apenas imagens são permitidas')

    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onloadend = e => onChange(String(e.target.result))
  }

  return (
    <ImagePickerContainer image={image || '/images/default-user.png'}>
      <input
        onChange={e => getBase64FromFile(e.target.files)}
        type="file"
        accept="image/png, image/jpeg"
      />
      <FiCamera />
    </ImagePickerContainer>
  )
}

export default ImagePicker
