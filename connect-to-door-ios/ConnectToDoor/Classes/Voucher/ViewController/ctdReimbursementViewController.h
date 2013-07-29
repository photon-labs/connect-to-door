//
//  ctdReimbursementViewController.h
//  ConnectToDoor
//
//  Created by Photon Infotech on 7/22/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "ctdBaseViewController.h"
#import "ctdProfileService.h"

@interface ctdReimbursementViewController : ctdBaseViewController<ProfileServiceDelegate>{
    
    IBOutlet UIScrollView *scrollView;
    IBOutlet UIView *formView;
    IBOutlet UILabel *employeeName;
    IBOutlet UILabel *employeeID;
    IBOutlet UILabel *projectID;
    IBOutlet UILabel *dateTodayTxt;
    
    IBOutlet UIToolbar *toolbarDatePicker;
    
    IBOutlet UIBarButtonItem *saveBtnDatePicker;
    IBOutlet UIBarButtonItem *cancelBtnDatePicker;
    
    IBOutlet UISegmentedControl *datePickerCtrl;
    
    IBOutlet UIDatePicker *datePicker;
    IBOutlet UIPickerView *reimbursementPicker;
    
    IBOutlet UIButton *reimbursementBtn;
    IBOutlet UIButton *dateBtn;
    
    IBOutlet UIButton *backBtn;
    
    IBOutlet UITextField *dateTxt;
    IBOutlet UITextField *reimbursementTxt;
    IBOutlet UITextField *descriptionTxt;
    IBOutlet UITextField *quantityTxt;
    IBOutlet UITextField *costTxt;
    IBOutlet UITextField *cashAdvanceTxt;
}


@property (nonatomic, strong) IBOutlet UITableView *listReimbursement;

- (IBAction)didDatePickerClicked:(id)sender;
- (IBAction)didReimbursementTypeClicked:(id)sender;

- (IBAction)didBackClicked:(id)sender;

- (IBAction)didDatePickerSaveBtnTypeClicked:(id)sender;
- (IBAction)didDatePickerCancelBtnTypeClicked:(id)sender;

@end
