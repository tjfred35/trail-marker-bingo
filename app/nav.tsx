import * as React from 'react'
import cx from 'classnames'

import owl from '../public/peeking-owl-large.jpg'
import ccfDesktop from '../public/CCFlong.gif'
import owlLogoSm from '../public/graphics/owlogo-sm.gif'

export const Nav = () => {
  const [isOpen, setOpen] = React.useState(false)
  return (<>
    <div id="mobile-header">
      <div id="mobile-header-row">
        <a href="/" title='Home'>
          <div style={{
            height: '72px',
            width: '48px',
            overflow: 'hidden',
            flexGrow: '0',
            marginRight: '-10px',
            marginTop: '-16px',
            marginBottom: '-16px',
            marginLeft: '-16px'

          }}>
            <img src={owl} style={{
              height: '74px',
              marginTop: '-1px'
            }} alt='CCF Owl' />
          </div>
        </a>
        <div style={{ color: 'darkgreen', fontSize: '18px', flexGrow: 1 }}>
          The Carlisle Conservation Foundation
        </div>
        <button id="nav-toggle-button" type="button" onClick={() => {
          setOpen(!isOpen)
        }}>
          <svg
            style={{ fill: 'currentColor', height: '24px', width: '24px' }}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            <title>Menu</title>
          </svg>
        </button>
      </div>
      <div id="mobile-header-nav" className={cx({
        'open': isOpen
      })}>
        <ul>
          <li><a href="/aboutus.html">About us</a></li>
          <li><a href="/members.html">Membership</a></li>
          <li><a href="/Newsletter2022/ccf_annualreport_2022.html">News</a></li>
          <li><a href="/Resources.html">Conservation properties</a></li>
          <li><a href="/">Home</a></li>
        </ul>
      </div>
    </div>

    <p id="desktop-header"><img src={ccfDesktop} width="496" height="45" alt='Carlisle Conservation Fountation' /></p>
  </>)
}

export const Navigation = () => {
  return (
    <table cellPadding={0}>
      <tbody>
        <tr>
          <td>
            <div>
              <table
                className='navigation-table'
                style={{ height: '329px', width: '159px' }}
                cellPadding={0}
                cellSpacing={0}
              >
                <tbody>
                  <TableSpacerRow height='53px' />
                  <TableNavigationRow href='/aboutus.html'>About us</TableNavigationRow>
                  <TableSpacerRow />
                  <TableNavigationRow href='/members.html'>Membership</TableNavigationRow>
                  <TableSpacerRow />
                  <TableNavigationRow href='/Newsletter2022/ccf_annualreport_2022.html'>News</TableNavigationRow>
                  <TableSpacerRow />
                  <TableNavigationRow href='/properties.html'>Conservation properties</TableNavigationRow>
                  <TableSpacerRow />
                  <TableNavigationRow href='/resources.html'>Educational & Tech Resources</TableNavigationRow>
                  <TableSpacerRow />
                  <TableNavigationRow href='/index.html'>Home</TableNavigationRow>
                  <TableSpacerRow height='97px' />
                </tbody>
              </table>
            </div>
          </td>
        </tr>
        <tr style={{ lineHeight: 'normal', fontSize: '14px' }}>
          <td>
            <table width="100%" cellPadding={0} cellSpacing={0}>
              <tbody>
                <tr>
                  <td width="142">
                    <p style={{ textAlign: "right" }}>
                      Any
                      inquiries <br />
                      or comments <br />
                      please contact<br />
                      <a href="mailto:info1@ccf-web.org">
                        <span color="#990000">info1</span>
                        <span color="#990000">@ccf-web.org </span>
                      </a>
                    </p>
                    <p style={{ textAlign: "right" }}>
                      <img src={owlLogoSm} width="85" height="142" alt="ccf logo" />
                    </p>
                    <p style={{ textAlign: "right" }}>
                      <b>
                        CCF Directors
                      </b>
                    </p>
                    <p style={{ textAlign: "right" }}>
                      Alan Ankers<br />
                      Marty Blue<br />
                      Alex Chen<br />
                      Dan Cook<br />
                      Jonathan DeKock<br />
                      Tim Fredette<br />
                      Peg Gladstone<br />
                      Kelly Guarino<br />
                      Heidi Harring<br />
                      Amanda Hickman<br />
                      Steve Hinton<br />
                      Diana Kolstad<br />
                      Joe Lerner<br />
                      Melinda Lindquist<br />
                      Rick Oches<br />
                      Steve Tobin<br />
                      Diane Troppoli
                    </p>
                  </td>
                </tr>
                <tr>
                  <td height="69">
                    <div style={{ textAlign: "right" }}>
                      <b>
                        CCF<br />
                        P.O. Box 300<br />
                        Carlisle, MA 01741
                      </b>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td height="69"><div style={{ textAlign: "right" }}>
                    <p>
                      For website issues<br />
                      please contact<br />
                      <a href="mailto:webadmin@ccf-web.org">
                        <span color="#990000">webadmin@ccf-web.org </span>
                      </a>
                    </p>
                  </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table >
  )
}


const TableSpacerRow = ({ height = '18.5px' }: { height?: string }) => {
  return <tr>
    <td colSpan={2}><div style={{ height, width: 'auto' }} /></td>
  </tr>
}

const TableNavigationRow = ({ href, children }: { href: string, children: string }) => {
  const isLongText = children.length > 20
  return (
    <tr>
      <td width="9px">&nbsp;</td>
      <td width="150px">
        <a href={href}>
          <div
            style={{
              height: '35px',
              width: '140px',
              position: 'relative'
            }}
            className='navigation-graphic'
          >
            <div
              style={{
                position: 'absolute',
                right: '0',
                top: '0',
                borderTop: '17.5px solid transparent',
                borderLeft: '18px solid #cc9',
                borderBottom: '17.5px solid transparent'
              }}

            />
            <div
              style={{
                position: 'absolute',
                right: '18px',
                left: '0',
                top: '0',
                bottom: '0',
                background: '#cc9'
              }} />
            <div
              style={{
                position: 'absolute',
                right: '1px',
                top: '1px',
                borderTop: '16.5px solid transparent',
                borderLeft: '17px solid darkgreen',
                borderBottom: '16.5px solid transparent'
              }} />
            <div
              style={{
                position: 'absolute',
                right: '18px',
                left: '1px',
                top: '1px',
                bottom: '1px',
                background: 'darkgreen'
              }} />

            <div
              className='navigation-chevron'
              style={{
                position: 'absolute',
                width: '16px',
                height: '16px',
                border: '2px solid yellow',
                borderLeft: '0',
                borderTop: '0',
                top: '8.5px',
                right: '10px',
                transform: 'rotate(-45deg)'
              }} />

            <div style={{
              position: 'absolute',
              fontWeight: 'bold',
              fontSize: isLongText ? '11px' : '13px',
              letterSpacing: '0.5px',
              display: 'flex',
              alignItems: 'center',
              top: '0',
              bottom: '0',
              left: '5px',
              lineHeight: '13px',
              right: '22px'
            }}>
              {children}
            </div>
          </div>
        </a>
      </td>
    </tr>
  )
}
