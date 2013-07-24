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
}


@property (nonatomic, strong) IBOutlet UILabel *employeeName;
@property (nonatomic, strong) IBOutlet UILabel *employeeID;
@property (nonatomic, strong) IBOutlet UILabel *projectID;
@property (nonatomic, strong) IBOutlet UILabel *dateTodayTxt;

@property (nonatomic, strong) IBOutlet UIToolbar *toolbarDatePicker;

@property (nonatomic, strong) IBOutlet UIBarButtonItem *saveBtnDatePicker;
@property (nonatomic, strong) IBOutlet UIBarButtonItem *cancelBtnDatePicker;

@property (nonatomic, strong) IBOutlet UISegmentedControl *datePickerCtrl;

@property (nonatomic, strong) IBOutlet UIDatePicker *datePicker;
@property (nonatomic, strong) IBOutlet UIPickerView *reimbursementPicker;

@property (nonatomic, strong) IBOutlet UIButton *reimbursementBtn;
@property (nonatomic, strong) IBOutlet UIButton *dateBtn;

@property (nonatomic, strong) IBOutlet UIButton *backBtn;

@property (nonatomic, strong) IBOutlet UITextField *dateTxt;
@property (nonatomic, strong) IBOutlet UITextField *reimbursementTxt;
@property (nonatomic, strong) IBOutlet UITextField *descriptionTxt;
@property (nonatomic, strong) IBOutlet UITextField *quantityTxt;
@property (nonatomic, strong) IBOutlet UITextField *costTxt;
@property (nonatomic, strong) IBOutlet UITextField *cashAdvanceTxt;

- (IBAction)didDatePickerClicked:(id)sender;
- (IBAction)didReimbursementTypeClicked:(id)sender;

- (IBAction)didBackClicked:(id)sender;

- (IBAction)didDatePickerSaveBtnTypeClicked:(id)sender;
- (IBAction)didDatePickerCancelBtnTypeClicked:(id)sender;

@end
