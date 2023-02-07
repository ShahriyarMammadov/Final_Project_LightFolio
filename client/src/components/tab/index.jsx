import React from "react";
import "./index.scss";
import { Link } from "react-router-dom";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

const TabComponent = () => {
  return (
    <div className="tabComponent">
      <Tabs variant="soft-rounded" colorScheme="green">
        <TabList>
          <Tab>Client Galleries</Tab>
          <Tab>Studio Manager</Tab>
          <Tab>Website</Tab>
          <Tab>Bundles</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <p className="tabHeader">
              <i>Proof, share, deliver and sell photos online.</i>
            </p>
            <table>
              <thead>
                <tr>
                  <th>FREE</th>
                  <th>Lite</th>
                  <th>Starter</th>
                  <th>Pro</th>
                  <th>Premium</th>
                </tr>
              </thead>
              <tbody>
                <tr className="headertd">
                  <td>
                    $0 <span>/mo</span>
                    <p>no charge</p>
                  </td>
                  <td>
                    $7 <span>/mo</span>
                    <p>
                      billed annually or <span>$9</span> month to month
                    </p>
                  </td>
                  <td>
                    $12 <span>/mo</span>
                    <p>
                      billed annually or <span>$16</span> month to month
                    </p>
                  </td>
                  <td>
                    $20 <span>/mo</span>
                    <p>
                      billed annually or <span>$25</span> month to month
                    </p>
                  </td>
                  <td>
                    $40 <span>/mo</span>
                    <p>
                      billed annually or <span>$50</span> month to month
                    </p>
                  </td>
                </tr>

                <tr>
                  <td>
                    <Link to={"/signup"}>Get Started</Link>
                  </td>
                  <td>
                    <Link to={"/signup"}>Get Started</Link>
                  </td>
                  <td>
                    <Link to={"/signup"}>Get Started</Link>
                  </td>
                  <td>
                    <Link to={"/signup"}>Get Started</Link>
                  </td>
                  <td>
                    <Link to={"/signup"}>Get Started</Link>
                  </td>
                </tr>

                <tr className="storagetr">
                  <td>
                    <i className="fa-solid fa-check"></i>
                    <span>1 GB</span> Storage
                    <p>(About 200 Images)</p>
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    <span>30 GB</span> Storage
                    <p>(About 6,000 Images)</p>
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    <span>100 GB</span> Storage
                    <p>(About 20,000 Images)</p>
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    <span>1000 GB</span> Storage
                    <p>(About 200,000 Images)</p>
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    <span>Unlimited</span> Storage
                    <p>(Unlimited Images)</p>
                  </td>
                </tr>

                <tr className="commissiontr storagetr">
                  <td>
                    <i className="fa-solid fa-check"></i> 15% Commission
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i> <span>No</span>{" "}
                    commission
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i> <span>No</span>{" "}
                    commission
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i> <span>No</span>{" "}
                    commission
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i> <span>No</span>{" "}
                    commission
                  </td>
                </tr>

                <tr>
                  <td>
                    <i className="fa-solid fa-check"></i> Proofing
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i> Proofing
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i> Proofing
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i> Proofing
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i> Proofing
                  </td>
                </tr>

                <tr>
                  <td>
                    <i className="fa-solid fa-check"></i> Use Your Logo
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i> Use Your Logo
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i> Use Your Logo
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i> Use Your Logo
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i> Use Your Logo
                  </td>
                </tr>

                <tr>
                  <td></td>
                  <td>
                    <i className="fa-solid fa-check"></i> Custom Domain
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i> Custom Domain
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i> Custom Domain
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i> Custom Domain
                  </td>
                </tr>

                <tr>
                  <td></td>
                  <td></td>
                  <td>
                    <i className="fa-solid fa-check"></i> Remove Lightfolio
                    Branding
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i> Remove Lightfolio
                    Branding
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i> Remove Lightfolio
                    Branding
                  </td>
                </tr>

                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    {" "}
                    <i className="fa-solid fa-check"></i> Priority Support
                  </td>
                  <td>
                    {" "}
                    <i className="fa-solid fa-check"></i> Priority Support
                  </td>
                </tr>
              </tbody>
            </table>
          </TabPanel>

          <TabPanel>
            <p className="tabHeader">
              <i>
                CRM: Online booking, projects, mini-sessions, contracts,
                invoicing, questionnaires, bio link
              </i>
            </p>
            <table>
              <thead>
                <tr>
                  <th>FREE</th>
                  <th>Lite</th>
                  <th>Pro</th>
                </tr>
              </thead>
              <tbody>
                <tr className="headertd">
                  <td>
                    $0 <span>/mo</span>
                    <p>no charge</p>
                  </td>
                  <td>
                    $12 <span>/mo</span>
                    <p>
                      billed annually or <span>$15</span> month to month
                    </p>
                  </td>
                  <td>
                    $15 <span>/mo</span>
                    <p>
                      billed annually or <span>$20</span> month to month
                    </p>
                  </td>
                </tr>

                <tr>
                  <td>
                    <Link to={"/signup"}>Get Started</Link>
                  </td>
                  <td>
                    <Link to={"/signup"}>Get Started</Link>
                  </td>
                  <td>
                    <Link to={"/signup"}>Get Started</Link>
                  </td>
                </tr>

                <tr className="storagetr">
                  <td>
                    <i className="fa-solid fa-check"></i>
                    <span>Unlimited </span> Projects
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    <span>Unlimited </span> Projects
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    <span>Unlimited </span> Projects
                  </td>
                </tr>

                <tr className="commissiontr storagetr">
                  <td>
                    <i className="fa-solid fa-check"></i>
                    <span>Unlimited </span> Contacts
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    <span>Unlimited </span> Contacts
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    <span>Unlimited </span> Contacts
                  </td>
                </tr>

                <tr className="storagetr">
                  <td>
                    <i className="fa-solid fa-check"></i>
                    <span>5 </span> Documents
                    <p>Invoices, contracts & more</p>
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    <span>Unlimited </span> Documents
                    <p>Invoices, contracts & more</p>
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    <span>Unlimited </span> Documents
                    <p>Invoices, contracts & more</p>
                  </td>
                </tr>

                <tr className="storagetr">
                  <td>
                    <i className="fa-solid fa-check"></i>
                    <span>5 </span> Questionnaires
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    <span>Unlimited </span> Questionnaires
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    <span>Unlimited </span> Questionnaires
                  </td>
                </tr>

                <tr className="storagetr">
                  <td>
                    <i className="fa-solid fa-check"></i>
                    <span>10 </span> Booking
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    <span>10 </span> Questionnaires
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    <span>Unlimited </span> Questionnaires
                  </td>
                </tr>

                <tr className="storagetr">
                  <td>
                    <i className="fa-solid fa-check"></i>
                    <span>5 </span> Client Portals
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    <span>5 </span> Client Portals
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    <span>Unlimited </span> Client Portals
                  </td>
                </tr>

                <tr>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    Custom Domain
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    Custom Domain
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    Custom Domain
                  </td>
                </tr>
              </tbody>
            </table>
          </TabPanel>

          <TabPanel>
            <p className="tabHeader">
              <i>Websites for photographers.</i>
            </p>
            <table>
              <thead>
                <tr>
                  <th>FREE</th>
                  <th>PRO</th>
                  <th>PREMIUM</th>
                </tr>
              </thead>
              <tbody>
                <tr className="headertd">
                  <td>
                    $0 <span>/mo</span>
                    <p>no charge</p>
                  </td>
                  <td>
                    $10 <span>/mo</span>
                    <p>
                      billed annually or <span>$14</span> month to month
                    </p>
                  </td>
                  <td>
                    $16 <span>/mo</span>
                    <p>
                      billed annually or <span>$20</span> month to month
                    </p>
                  </td>
                </tr>

                <tr>
                  <td>
                    <Link to={"/signup"}>Get Started</Link>
                  </td>
                  <td>
                    <Link to={"/signup"}>Get Started</Link>
                  </td>
                  <td>
                    <Link to={"/signup"}>Get Started</Link>
                  </td>
                </tr>

                <tr className="storagetr">
                  <td>
                    <i className="fa-solid fa-check"></i>
                    <span>5 </span> Projects
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    <span>Unlimited </span> Projects
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    <span>Unlimited </span> Projects
                  </td>
                </tr>

                <tr className="commissiontr storagetr">
                  <td>
                    <i className="fa-solid fa-check"></i>
                    <span>100 </span> Photos
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    <span>500 </span> Photos
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    <span>Unlimited </span> Photos
                  </td>
                </tr>

                <tr>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    SSL/TLS Security
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    SSL/TLS Security
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    SSL/TLS Security
                  </td>
                </tr>

                <tr className="storagetr">
                  <td>
                    <i className="fa-solid fa-check"></i>
                    Basic Visitor Analytics
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    Basic Visitor Analytics
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    Basic Visitor Analytics
                  </td>
                </tr>

                <tr className="storagetr">
                  <td>
                    <i className="fa-solid fa-check"></i>
                    Use Your Logo
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    Use Your Logo
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    Use Your Logo
                  </td>
                </tr>

                <tr className="storagetr">
                  <td></td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    Custom Domain
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    Custom Domain
                  </td>
                </tr>

                <tr>
                  <td></td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    Remove Lightfolio Branding
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    Remove Lightfolio Branding
                  </td>
                </tr>

                <tr>
                  <td></td>
                  <td></td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    Priority Support
                  </td>
                </tr>
              </tbody>
            </table>
          </TabPanel>

          <TabPanel>
            <p className="tabHeader">
              <i>Access to every feature at the best rates.</i>
            </p>
            <table>
              <thead>
                <tr>
                  <th>Starter</th>
                  <th>PRO</th>
                  <th>PREMIUM</th>
                </tr>
              </thead>
              <tbody>
                <tr className="headertd">
                  <td>
                    $20 <span>/mo</span>
                    <p>
                      billed annually or <span>$25</span> month to month
                    </p>
                  </td>
                  <td>
                    $28 <span>/mo</span>
                    <p>
                      billed annually or <span>$35</span> month to month
                    </p>
                  </td>
                  <td>
                    $48 <span>/mo</span>
                    <p>
                      billed annually or <span>$55</span> month to month
                    </p>
                  </td>
                </tr>

                <tr>
                  <td>
                    <Link to={"/signup"}>Get Started</Link>
                  </td>
                  <td>
                    <Link to={"/signup"}>Get Started</Link>
                  </td>
                  <td>
                    <Link to={"/signup"}>Get Started</Link>
                  </td>
                </tr>

                <tr className="colourHeader">
                  <td>
                    <i className="fa-solid fa-image"></i> CLIENT GALLERIES
                  </td>
                  <td>
                    <i className="fa-solid fa-image"></i> CLIENT GALLERIES
                  </td>
                  <td>
                    <i className="fa-solid fa-image"></i> CLIENT GALLERIES
                  </td>
                </tr>

                <tr className="storagetr">
                  <td>
                    <i className="fa-solid fa-check"></i>
                    <span>30 </span> Storage
                    <p>(About 40,000 Images)</p>
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    <span>1000 </span> Storage
                    <p>(About 200,000 Images)</p>
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    <span>Unlimited </span> Storage
                    <p>(Unlimited Images)</p>
                  </td>
                </tr>

                <tr className="commissiontr storagetr">
                  <td>
                    <i className="fa-solid fa-check"></i>
                    <span>No </span> Commission
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    <span>No </span> Commission
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    <span>No </span> Commission
                  </td>
                </tr>

                <tr>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    Proofing
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    Proofing
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    Proofing
                  </td>
                </tr>

                <tr className="storagetr">
                  <td>
                    <i className="fa-solid fa-check"></i>
                    Online Sales
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    Online Sales
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    Online Sales
                  </td>
                </tr>

                <tr className="storagetr">
                  <td>
                    <i className="fa-solid fa-check"></i>
                    Use Your Logo
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    Use Your Logo
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    Use Your Logo
                  </td>
                </tr>

                <tr className="storagetr">
                  <td>
                    <i className="fa-solid fa-check"></i>
                    Custom Domain
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    Custom Domain
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    Custom Domain
                  </td>
                </tr>

                <tr>
                  <td>
                    <i className="fa-solid fa-check"></i> Remove Lightfolio
                    Branding
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    Remove Lightfolio Branding
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    Remove Lightfolio Branding
                  </td>
                </tr>

                <tr className="colourHeader">
                  <td>
                    <i className="fa-solid fa-file"></i> STUDIO MANAGER (CRM)
                  </td>
                  <td>
                    <i className="fa-solid fa-file"></i> STUDIO MANAGER (CRM)
                  </td>
                  <td>
                    <i className="fa-solid fa-file"></i>
                    STUDIO MANAGER (CRM)
                  </td>
                </tr>

                <tr className="storagetr">
                  <td>
                    <i className="fa-solid fa-check"></i>
                    <span>Unlimited</span> Projects
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    <span>Unlimited</span> Projects
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    <span>Unlimited</span> Projects
                  </td>
                </tr>

                <tr className="storagetr">
                  <td>
                    <i className="fa-solid fa-check"></i>
                    <span>Unlimited</span> Contacts
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    <span>Unlimited</span> Contacts
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    <span>Unlimited</span> Contacts
                  </td>
                </tr>

                <tr className="storagetr">
                  <td>
                    <i className="fa-solid fa-check"></i>
                    <span>Unlimited</span> Documents
                    <p>Invoices, contracts & more</p>
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    <span>Unlimited</span> Documents
                    <p>Invoices, contracts & more</p>
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    <span>Unlimited</span> Documents
                    <p>Invoices, contracts & more</p>
                  </td>
                </tr>

                <tr className="storagetr">
                  <td>
                    <i className="fa-solid fa-check"></i>
                    <span>Unlimited</span> Questionnaires
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    <span>Unlimited</span> Questionnaires
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    <span>Unlimited</span> Questionnaires
                  </td>
                </tr>

                <tr className="storagetr">
                  <td>
                    <i className="fa-solid fa-check"></i>
                    <span>Unlimited</span> Bookings
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    <span>Unlimited</span> Bookings
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    <span>Unlimited</span> Bookings
                  </td>
                </tr>

                <tr className="storagetr">
                  <td>
                    <i className="fa-solid fa-check"></i>
                    <span>Unlimited</span> Client Portals
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    <span>Unlimited</span> Client Portals
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    <span>Unlimited</span> Client Portals
                  </td>
                </tr>

                <tr className="colourHeader">
                  <td>
                    {" "}
                    <i className="fa-solid fa-globe"></i> WEBSITES
                  </td>
                  <td>
                    {" "}
                    <i className="fa-solid fa-globe"></i> WEBSITES
                  </td>
                  <td>
                    {" "}
                    <i className="fa-solid fa-globe"></i> WEBSITES
                  </td>
                </tr>

                <tr className="storagetr">
                  <td>
                    <i className="fa-solid fa-check"></i>
                    <span>Unlimited</span> Pages
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    <span>Unlimited</span> Pages
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    <span>Unlimited</span> Pages
                  </td>
                </tr>

                <tr className="storagetr">
                  <td>
                    <i className="fa-solid fa-check"></i>
                    <span>500</span> Photos
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    <span>Unlimited</span> Photos
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    <span>Unlimited</span> Photos
                  </td>
                </tr>

                <tr>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    SSL/TLS Security
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    SSL/TLS Security
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    SSL/TLS Security
                  </td>
                </tr>

                <tr>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    Basic Visitor Analytics
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    Basic Visitor Analytics
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    Basic Visitor Analytics
                  </td>
                </tr>

                <tr>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    Use Your Logo
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    Use Your Logo
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    Use Your Logo
                  </td>
                </tr>

                <tr>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    Custom Domain
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    Custom Domain
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    Custom Domain
                  </td>
                </tr>

                <tr>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    Remove Lightfolio Branding
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    Remove Lightfolio Branding
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    Remove Lightfolio Branding
                  </td>
                </tr>

                <tr className="underlinetd">
                  <td>
                    <i className="fa-solid fa-check"></i>
                    Priority Support
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    Priority Support
                  </td>
                  <td>
                    <i className="fa-solid fa-check"></i>
                    Priority Support
                  </td>
                </tr>
              </tbody>
            </table>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default TabComponent;
