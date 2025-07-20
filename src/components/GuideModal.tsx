import {
  ModalHeader,
  ModalContent,
  Button,
  Modal,
  Icon,
} from "semantic-ui-react"
import { useAppSelector } from "../app/hooks"
import "./GuideModal.css"
import React from "react"
import GuideContent from "./GuideContent"

function GuideModal() {
  const [open, setOpen] = React.useState(false)
  const selectedGlitch = useAppSelector(state => state.app.selectedGlitch)

  if (!selectedGlitch.glitch) {
    return null
  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>See Guide/More info</Button>}
    >
      <ModalHeader>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <Button icon basic compact inverted onClick={() => setOpen(false)}>
            <Icon name="close" inverted />
          </Button>
        </div>
      </ModalHeader>
      <ModalContent>
        <GuideContent selectedGlitch={selectedGlitch.glitch} />
      </ModalContent>
    </Modal>
  )
}

export default GuideModal
