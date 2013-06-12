/**********************************************************
 * Demo for Standalone SDK.Created by Darcy on Oct.15 2009*
***********************************************************/
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Text;
using System.Windows.Forms;

using Microsoft.Win32;
//Include mysql client namespace.

using Newtonsoft.Json.Linq;
using Newtonsoft.Json;


namespace RTEvents
{
    public partial class RTEventsMain : Form
    {
        public RTEventsMain()
        {
            InitializeComponent();
        }

        //Create Standalone SDK class dynamicly.
        public zkemkeeper.CZKEMClass axCZKEM1 = new zkemkeeper.CZKEMClass();
        public zkemkeeper.CZKEMClass axCZKEM2 = new zkemkeeper.CZKEMClass();

        /********************************************************************************************************************************************
        * Before you refer to this demo,we strongly suggest you read the development manual deeply first.                                           *
        * This part is for demonstrating the communication with your device.*
        * The communication way which you can use duing to the model of the device.                                                                 *
        * *******************************************************************************************************************************************/
        #region Communication
        private bool bIsConnected = false;//the boolean value identifies whether the device1 is connected
        private bool bIsConnected2 = false;//the boolean value identifies whether the device2 is connected
        private int iMachineNumber = 1;//the serial number of the device.After connecting the device ,this value will be changed.

        //If your device supports the TCP/IP communications, you can refer to this.
        //when you are using the tcp/ip communication,you can distinguish different devices by their IP address.
        private void btnConnect_Click(object sender, EventArgs e)
        {
            if (txtIP.Text.Trim() == "" || txtPort.Text.Trim() == "")
            {
                MessageBox.Show("IP and Port cannot be null", "Error");
                return;
            }
            int idwErrorCode = 0;

            Cursor = Cursors.WaitCursor;
            if (btnConnect.Text == "DisConnect")
            {
                unRegEventazKem1();
                unRegEventazKem2();
                bIsConnected = false;
                bIsConnected2 = false;
                btnConnect.Text = "Connect";
                lblState.Text = "Current State:DisConnected";
                Cursor = Cursors.Default;
                return;
            }

            bIsConnected2 = axCZKEM1.Connect_Net(txtIP2.Text, Convert.ToInt32(txtPort.Text));
            bIsConnected = axCZKEM2.Connect_Net(txtIP.Text, Convert.ToInt32(txtPort.Text));

            if (bIsConnected == true && bIsConnected2 == true)
            {
                btnConnect.Text = "DisConnect";
                btnConnect.Refresh();
                lblState.Text = "Current State:Connected";
                iMachineNumber = 1;//In fact,when you are using the tcp/ip communication,this parameter will be ignored,that is any integer will all right.Here we use 1.
                if (axCZKEM1.RegEvent(iMachineNumber, 65535))//Here you can register the realtime events that you want to be triggered(the parameters 65535 means registering all)
                {
                    regEventAzkem1();
                }
                if (axCZKEM2.RegEvent(iMachineNumber, 65535))//Here you can register the realtime events that you want to be triggered(the parameters 65535 means registering all)
                {
                    regEventAzkem2();

                }
            }
            else
            {
                axCZKEM1.GetLastError(ref idwErrorCode);
                MessageBox.Show("Unable to connect the device,ErrorCode=" + idwErrorCode.ToString(), "Error");
            }
            Cursor = Cursors.Default;
        }

        #endregion

        /*************************************************************************************************
        * Before you refer to this demo,we strongly suggest you read the development manual deeply first.*
        * This part is for demonstrating the RealTime Events that triggered  by your operations          *
        **************************************************************************************************/
        #region RealTime Events

        //When you place your finger on sensor of the device,this event will be triggered
        private void handleOnFinger()
        {
            lbRTShow.Items.Add("RTEvent OnFinger Has been Triggered");
        }

        //After you have placed your finger on the sensor(or swipe your card to the device),this event will be triggered.
        //If you passes the verification,the returned value userid will be the user enrollnumber,or else the value will be -1;
        private void handleOnVerify(int iUserID)
        {

            lbRTShow.Items.Add("RTEvent OnVerify Has been Triggered,Verifying...");
            if (iUserID != -1)
            {
                lbRTShow.Items.Add("Verified OK,the UserID is " + iUserID.ToString());
            }
            else
            {
                lbRTShow.Items.Add("Verified Failed... ");
            }
        }

        //If your fingerprint(or your card) passes the verification,this event will be triggered
        private void handleOnAttTransactionEx(string sEnrollNumber, int iIsInValid, int iAttState, int iVerifyMethod, int iYear, int iMonth, int iDay, int iHour, int iMinute, int iSecond, int iWorkCode)
        {
            try
            {
          
                if (iAttState <= 1)
                {
                    String employeeIdResponse = HttpClientClass.callService("http://172.17.10.165:8080/AttendanceWebService/api/verify-finger-id", "{\"finger_id\" : " + sEnrollNumber + "}");
                    JObject objResp = JObject.Parse(employeeIdResponse);

                    //get json value employee id
                    String employeeId = (string)objResp["employeeId"];

                    if (iAttState == 0)
                    {
                        HttpClientClass.callService("http://172.17.10.165:8080/AttendanceWebService/api/check-in-out", "{\"employee_id\" :" + employeeId + ",\"status\" :\"checkIn\"}");
                        lbRTShow.Items.Add("checkin");
                    }
                    else
                    {
                        HttpClientClass.callService("http://172.17.10.165:8080/AttendanceWebService/api/check-in-out", "{\"employee_id\" :" + employeeId + ",\"status\" :\"checkOut\"}");
                        lbRTShow.Items.Add("checkout");
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }

            lbRTShow.Items.Add("RTEvent OnAttTrasactionEx Has been Triggered,Verified OK");
            lbRTShow.Items.Add("...UserID:" + sEnrollNumber);
            lbRTShow.Items.Add("...isInvalid:" + iIsInValid.ToString());
            lbRTShow.Items.Add("...attState:" + iAttState.ToString());
            lbRTShow.Items.Add("...VerifyMethod:" + iVerifyMethod.ToString());
            lbRTShow.Items.Add("...Workcode:" + iWorkCode.ToString());//the difference between the event OnAttTransaction and OnAttTransactionEx
            lbRTShow.Items.Add("...Time:" + iYear.ToString() + "-" + iMonth.ToString() + "-" + iDay.ToString() + " " + iHour.ToString() + ":" + iMinute.ToString() + ":" + iSecond.ToString());
        }

        //When you have enrolled your finger,this event will be triggered and return the quality of the fingerprint you have enrolled
        private void handleOnFingerFeature(int iScore)
        {
            if (iScore < 0)
            {
                lbRTShow.Items.Add("The quality of your fingerprint is poor");
            }
            else
            {
                lbRTShow.Items.Add("RTEvent OnFingerFeature Has been Triggered...Score:　" + iScore.ToString());
            }
        }

        //When you are enrolling your finger,this event will be triggered.
        private void handleOnEnrollFingerEx(string sEnrollNumber, int iFingerIndex, int iActionResult, int iTemplateLength)
        {
            if (iActionResult == 0)
            {
                lbRTShow.Items.Add("RTEvent OnEnrollFigerEx Has been Triggered....");
                lbRTShow.Items.Add(".....UserID: " + sEnrollNumber + " Index: " + iFingerIndex.ToString() + " tmpLen: " + iTemplateLength.ToString());
            }
            else
            {
                lbRTShow.Items.Add("RTEvent OnEnrollFigerEx Has been Triggered Error,actionResult=" + iActionResult.ToString());
            }
        }

        //When you have deleted one one fingerprint template,this event will be triggered.
        private void handleOnDeleteTemplate(int iEnrollNumber, int iFingerIndex)
        {
            lbRTShow.Items.Add("RTEvent OnDeleteTemplate Has been Triggered...");
            lbRTShow.Items.Add("...UserID=" + iEnrollNumber.ToString() + " FingerIndex=" + iFingerIndex.ToString());
        }

        //When you have enrolled a new user,this event will be triggered.
        private void handleOnNewUser(int iEnrollNumber)
        {
            lbRTShow.Items.Add("RTEvent OnNewUser Has been Triggered...");
            lbRTShow.Items.Add("...NewUserID=" + iEnrollNumber.ToString());
        }

        //When you swipe a card to the device, this event will be triggered to show you the card number.
        private void handleOnHIDNum(int iCardNumber)
        {
            lbRTShow.Items.Add("RTEvent OnHIDNum Has been Triggered...");
            lbRTShow.Items.Add("...Cardnumber=" + iCardNumber.ToString());
        }

        //When the dismantling machine or duress alarm occurs, trigger this event.
        private void handleOnAlarm(int iAlarmType, int iEnrollNumber, int iVerified)
        {
            lbRTShow.Items.Add("RTEvnet OnAlarm Has been Triggered...");
            lbRTShow.Items.Add("...AlarmType=" + iAlarmType.ToString());
            lbRTShow.Items.Add("...EnrollNumber=" + iEnrollNumber.ToString());
            lbRTShow.Items.Add("...Verified=" + iVerified.ToString());
        }

        //Door sensor event
        private void handleOnDoor(int iEventType)
        {
            lbRTShow.Items.Add("RTEvent Ondoor Has been Triggered...");
            lbRTShow.Items.Add("...EventType=" + iEventType.ToString());
        }

        //When you have emptyed the Mifare card,this event will be triggered.
        private void handleOnEmptyCard(int iActionResult)
        {
            lbRTShow.Items.Add("RTEvent OnEmptyCard Has been Triggered...");
            if (iActionResult == 0)
            {
                lbRTShow.Items.Add("...Empty Mifare Card OK");
            }
            else
            {
                lbRTShow.Items.Add("...Empty Failed");
            }
        }

        //When you have written into the Mifare card ,this event will be triggered.
        private void handleOnWriteCard(int iEnrollNumber, int iActionResult, int iLength)
        {
            lbRTShow.Items.Add("RTEvent OnWriteCard Has been Triggered...");
            if (iActionResult == 0)
            {
                lbRTShow.Items.Add("...Write Mifare Card OK");
                lbRTShow.Items.Add("...EnrollNumber=" + iEnrollNumber.ToString());
                lbRTShow.Items.Add("...TmpLength=" + iLength.ToString());
            }
            else
            {
                lbRTShow.Items.Add("...Write Failed");
            }
        }

        //After function GetRTLog() is called ,RealTime Events will be triggered. 
        //When you are using these two functions, it will request data from the device forwardly.
        private void rtTimer_Tick(object sender, EventArgs e)
        {
            if (axCZKEM1.ReadRTLog(iMachineNumber))
            {
                while (axCZKEM1.GetRTLog(iMachineNumber))
                {
                    ;
                }
            }
        }
        #endregion

        private void unRegEventazKem1()
        {
            this.axCZKEM1.Disconnect();
            this.axCZKEM1.OnFinger -= new zkemkeeper._IZKEMEvents_OnFingerEventHandler(handleOnFinger);
            this.axCZKEM1.OnVerify -= new zkemkeeper._IZKEMEvents_OnVerifyEventHandler(handleOnVerify);
            this.axCZKEM1.OnAttTransactionEx -= new zkemkeeper._IZKEMEvents_OnAttTransactionExEventHandler(handleOnAttTransactionEx);
            this.axCZKEM1.OnFingerFeature -= new zkemkeeper._IZKEMEvents_OnFingerFeatureEventHandler(handleOnFingerFeature);
            this.axCZKEM1.OnEnrollFingerEx -= new zkemkeeper._IZKEMEvents_OnEnrollFingerExEventHandler(handleOnEnrollFingerEx);
            this.axCZKEM1.OnDeleteTemplate -= new zkemkeeper._IZKEMEvents_OnDeleteTemplateEventHandler(handleOnDeleteTemplate);
            this.axCZKEM1.OnNewUser -= new zkemkeeper._IZKEMEvents_OnNewUserEventHandler(handleOnNewUser);
            this.axCZKEM1.OnHIDNum -= new zkemkeeper._IZKEMEvents_OnHIDNumEventHandler(handleOnHIDNum);
            this.axCZKEM1.OnAlarm -= new zkemkeeper._IZKEMEvents_OnAlarmEventHandler(handleOnAlarm);
            this.axCZKEM1.OnDoor -= new zkemkeeper._IZKEMEvents_OnDoorEventHandler(handleOnDoor);
            this.axCZKEM1.OnWriteCard -= new zkemkeeper._IZKEMEvents_OnWriteCardEventHandler(handleOnWriteCard);
            this.axCZKEM1.OnEmptyCard -= new zkemkeeper._IZKEMEvents_OnEmptyCardEventHandler(handleOnEmptyCard);
        }

        private void unRegEventazKem2()
        {
            this.axCZKEM2.Disconnect();
            this.axCZKEM2.OnFinger -= new zkemkeeper._IZKEMEvents_OnFingerEventHandler(handleOnFinger);
            this.axCZKEM2.OnVerify -= new zkemkeeper._IZKEMEvents_OnVerifyEventHandler(handleOnVerify);
            this.axCZKEM2.OnAttTransactionEx -= new zkemkeeper._IZKEMEvents_OnAttTransactionExEventHandler(handleOnAttTransactionEx);
            this.axCZKEM2.OnFingerFeature -= new zkemkeeper._IZKEMEvents_OnFingerFeatureEventHandler(handleOnFingerFeature);
            this.axCZKEM2.OnEnrollFingerEx -= new zkemkeeper._IZKEMEvents_OnEnrollFingerExEventHandler(handleOnEnrollFingerEx);
            this.axCZKEM2.OnDeleteTemplate -= new zkemkeeper._IZKEMEvents_OnDeleteTemplateEventHandler(handleOnDeleteTemplate);
            this.axCZKEM2.OnNewUser -= new zkemkeeper._IZKEMEvents_OnNewUserEventHandler(handleOnNewUser);
            this.axCZKEM2.OnHIDNum -= new zkemkeeper._IZKEMEvents_OnHIDNumEventHandler(handleOnHIDNum);
            this.axCZKEM2.OnAlarm -= new zkemkeeper._IZKEMEvents_OnAlarmEventHandler(handleOnAlarm);
            this.axCZKEM2.OnDoor -= new zkemkeeper._IZKEMEvents_OnDoorEventHandler(handleOnDoor);
            this.axCZKEM2.OnWriteCard -= new zkemkeeper._IZKEMEvents_OnWriteCardEventHandler(handleOnWriteCard);
            this.axCZKEM2.OnEmptyCard -= new zkemkeeper._IZKEMEvents_OnEmptyCardEventHandler(handleOnEmptyCard);
        }
        private void regEventAzkem1()
        {
            this.axCZKEM1.OnFinger += new zkemkeeper._IZKEMEvents_OnFingerEventHandler(handleOnFinger);
            this.axCZKEM1.OnVerify += new zkemkeeper._IZKEMEvents_OnVerifyEventHandler(handleOnVerify);
            this.axCZKEM1.OnAttTransactionEx += new zkemkeeper._IZKEMEvents_OnAttTransactionExEventHandler(handleOnAttTransactionEx);
            this.axCZKEM1.OnFingerFeature += new zkemkeeper._IZKEMEvents_OnFingerFeatureEventHandler(handleOnFingerFeature);
            this.axCZKEM1.OnEnrollFingerEx += new zkemkeeper._IZKEMEvents_OnEnrollFingerExEventHandler(handleOnEnrollFingerEx);
            this.axCZKEM1.OnDeleteTemplate += new zkemkeeper._IZKEMEvents_OnDeleteTemplateEventHandler(handleOnDeleteTemplate);
            this.axCZKEM1.OnNewUser += new zkemkeeper._IZKEMEvents_OnNewUserEventHandler(handleOnNewUser);
            this.axCZKEM1.OnHIDNum += new zkemkeeper._IZKEMEvents_OnHIDNumEventHandler(handleOnHIDNum);
            this.axCZKEM1.OnAlarm += new zkemkeeper._IZKEMEvents_OnAlarmEventHandler(handleOnAlarm);
            this.axCZKEM1.OnDoor += new zkemkeeper._IZKEMEvents_OnDoorEventHandler(handleOnDoor);
            this.axCZKEM1.OnWriteCard += new zkemkeeper._IZKEMEvents_OnWriteCardEventHandler(handleOnWriteCard);
            this.axCZKEM1.OnEmptyCard += new zkemkeeper._IZKEMEvents_OnEmptyCardEventHandler(handleOnEmptyCard);
        }
        private void regEventAzkem2()
        {
            this.axCZKEM2.OnFinger += new zkemkeeper._IZKEMEvents_OnFingerEventHandler(handleOnFinger);
            this.axCZKEM2.OnVerify += new zkemkeeper._IZKEMEvents_OnVerifyEventHandler(handleOnVerify);
            this.axCZKEM2.OnAttTransactionEx += new zkemkeeper._IZKEMEvents_OnAttTransactionExEventHandler(handleOnAttTransactionEx);
            this.axCZKEM2.OnFingerFeature += new zkemkeeper._IZKEMEvents_OnFingerFeatureEventHandler(handleOnFingerFeature);
            this.axCZKEM2.OnEnrollFingerEx += new zkemkeeper._IZKEMEvents_OnEnrollFingerExEventHandler(handleOnEnrollFingerEx);
            this.axCZKEM2.OnDeleteTemplate += new zkemkeeper._IZKEMEvents_OnDeleteTemplateEventHandler(handleOnDeleteTemplate);
            this.axCZKEM2.OnNewUser += new zkemkeeper._IZKEMEvents_OnNewUserEventHandler(handleOnNewUser);
            this.axCZKEM2.OnHIDNum += new zkemkeeper._IZKEMEvents_OnHIDNumEventHandler(handleOnHIDNum);
            this.axCZKEM2.OnAlarm += new zkemkeeper._IZKEMEvents_OnAlarmEventHandler(handleOnAlarm);
            this.axCZKEM2.OnDoor += new zkemkeeper._IZKEMEvents_OnDoorEventHandler(handleOnDoor);
            this.axCZKEM2.OnWriteCard += new zkemkeeper._IZKEMEvents_OnWriteCardEventHandler(handleOnWriteCard);
            this.axCZKEM2.OnEmptyCard += new zkemkeeper._IZKEMEvents_OnEmptyCardEventHandler(handleOnEmptyCard);
        }
    }
}