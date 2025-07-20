import React, { useState } from "react"
import { Button } from "semantic-ui-react"
import "./Collapsable.css"

interface IProps {
  open?: boolean
  children: React.ReactNode
  title: string
}

const Collapsible: React.FC<IProps> = ({ open, children, title }) => {
  const [isOpen, setIsOpen] = useState(open)

  const handleFilterOpening = () => {
    setIsOpen(prev => !prev)
  }

  return (
    <div className="collapsible-card">
      <div className="collapsible-container">
        <Button
          type="button"
          className="collapsible-header ui icon button"
          onClick={handleFilterOpening}
        >
          <div>
            <span style={{ marginRight: "4px" }}>{title} Guide</span>
            (Click to {isOpen ? "collapse" : "expand"})
          </div>
        </Button>
        {isOpen && <div className="collapsible-content">{children}</div>}
      </div>
    </div>
  )
}

export default Collapsible
