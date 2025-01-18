import React from "react"
import {
  ModalHeader,
  ModalContent,
  Button,
  Modal,
  Icon,
} from "semantic-ui-react"
import { useAppSelector } from "../app/hooks"
import { BlocksRenderer } from "@strapi/blocks-react-renderer"
import "./GuideModal.css"
import LinkRenderer from "./LinkRenderer"

// interface GuideModalProps {
//   open: boolean
//   onClose: () => void
// }

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
        <BlocksRenderer
          content={selectedGlitch.glitch.Guide}
          blocks={{
            paragraph: ({ children }) => (
              <p className="guide-text">{children}</p>
            ),
            image: ({ image }) => (
              <img
                className="guide-image"
                src={image.url}
                alt={image.alternativeText || undefined}
              />
            ),
            heading: ({ children }) => (
              <h1 className="guide-header">{children}</h1>
            ),
            link: ({ url }) => (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "1rem",
                }}
              >
                <LinkRenderer link={url} />
              </div>
            ),
          }}
        />
      </ModalContent>
    </Modal>
  )
}

export default GuideModal
